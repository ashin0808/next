import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ScheduleDate = {
  date: string;
  list: Schedule[];
};
type Schedule = {
  id: number;
  home_team_name: string;
  visiting_team_name: string;
  home_score: number;
  visiting_score: number;
};

export default async function FirstRound() {
  const data = await prisma.schedule.findMany({
    where: {
      round: 1,
    },
    include: {
      home_team: true,
      visiting_team: true,
    },
  });
  const scheduleList = data.reduce((acc: ScheduleDate[], schedule) => {
    if (acc.find((item) => item.date === schedule.date)) {
      const index = acc.findIndex((item) => item.date === schedule.date);
      acc[index].list.push({
        id: schedule.id,
        home_team_name: schedule.home_team.name,
        visiting_team_name: schedule.visiting_team.name,
        home_score: schedule.home_score,
        visiting_score: schedule.visiting_score,
      });
    } else {
      acc.push({
        date: schedule.date,
        list: [
          {
            id: schedule.id,
            home_team_name: schedule.home_team.name,
            visiting_team_name: schedule.visiting_team.name,
            home_score: schedule.home_score,
            visiting_score: schedule.visiting_score,
          },
        ],
      });
    }
    return acc;
  }, []);

  return (
    <div className="border-t">
      {scheduleList.map((item) => (
        <div key={item.date} className="border-b flex items-center">
          <div className="text-3xl w-28 text-center">{item.date}</div>
          <div className="flex-1 flex border-l">
            {item.list.map((schedule) => (
              <div key={schedule.id} className="flex flex-col w-1/4 border-r p-3">
                <div className={`flex items-center ${schedule.home_score > schedule.visiting_score ? 'text-rose-400' : 'text-gray-400'}`}>
                  <div className="flex-1">{schedule.home_team_name}</div>
                  <div className="w-5 text-center font-semibold">{schedule.home_score}</div>
                </div>
                <div className={`flex items-center ${schedule.home_score < schedule.visiting_score ? 'text-rose-400' : 'text-gray-400'}`}>
                  <div className="flex-1">{schedule.visiting_team_name}</div>
                  <div className="w-5 text-center font-semibold">{schedule.visiting_score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
