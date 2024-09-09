import { PrismaClient } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prisma = new PrismaClient();

type TeamStats = {
  [key: number]: {
    id: number;
    name: string;
    group_first_code: string;
    group_first_name: string;
    wins: number;
    losses: number;
    points: number;
    netScore: number;
  };
};

type TeamGroup = {
  [key: string]: {
    id: number;
    name: string;
    group_first_code: string;
    group_first_name: string;
    wins: number;
    losses: number;
    points: number;
    netScore: number;
  }[];
};

export const dynamic = 'force-dynamic'

export default async function Standings() {
  // 查询所有队伍
  const teams = await prisma.team.findMany({});

  // 查询所有赛程
  const schedules = await prisma.schedule.findMany({});

  // 初始化队伍统计数据
  const teamStats = teams.reduce((acc: TeamStats, team) => {
    acc[team.id] = {
      ...team,
      wins: 0,
      losses: 0,
      points: 0,
      netScore: 0,
    };
    return acc;
  }, {});

  // 计算每个队伍的胜场数、负场数、积分和净胜分
  schedules.forEach((game) => {
    const homeTeam = teamStats[game.home_team_id];
    const visitingTeam = teamStats[game.visiting_team_id];

    if (game.home_score > game.visiting_score) {
      homeTeam.wins += 1;
      homeTeam.points += 1;
      visitingTeam.losses += 1;
    } else if (game.home_score < game.visiting_score) {
      visitingTeam.wins += 1;
      visitingTeam.points += 1;
      homeTeam.losses += 1;
    }

    homeTeam.netScore += game.home_score - game.visiting_score;
    visitingTeam.netScore += game.visiting_score - game.home_score;
  });

  // 按 group_first_code 分组并排序
  const groupedTeams = Object.values(teamStats).reduce(
    (acc: TeamGroup, team) => {
      if (!acc[team.group_first_code]) {
        acc[team.group_first_code] = [];
      }
      acc[team.group_first_code].push(team);
      return acc;
    },
    {}
  );

  Object.keys(groupedTeams).forEach((group) => {
    groupedTeams[group].sort((a, b) => {
      if (b.points === a.points) {
        return b.netScore - a.netScore;
      }
      return b.points - a.points;
    });
  });

  return (
    <div className="flex flex-wrap">
      {Object.keys(groupedTeams).map((group) => (
        <div key={group} className="w-1/2 border p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>序号</TableHead>
                <TableHead>编号</TableHead>
                <TableHead>球队</TableHead>
                <TableHead>胜场数</TableHead>
                <TableHead>负场数</TableHead>
                <TableHead>积分</TableHead>
                <TableHead>净胜分</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedTeams[group].map((team, index) => (
                <TableRow
                  key={team.id}
                  className={`${index < 2 && "text-rose-400"}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{team.group_first_name}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.wins}</TableCell>
                  <TableCell>{team.losses}</TableCell>
                  <TableCell>{team.points}</TableCell>
                  <TableCell>{team.netScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
