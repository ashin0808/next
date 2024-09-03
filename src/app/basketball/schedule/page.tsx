"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Update from "./components/update";
import Create from "./components/create";

export default function Schedule() {
  const [teamList, setTeamList] = useState<ITeam[]>([]);
  const [scheduleList, setScheduleList] = useState<
    Array<ISchedule & { home_team: ITeam; visiting_team: ITeam }>
  >([]);

  const fetchTeams = async () => {
    const res = await fetch("/api/team", {
      method: "GET",
    });
    const data = await res.json();
    setTeamList(data);
  };

  const fetchSchedule = async () => {
    const res = await fetch("/api/schedule", {
      method: "GET",
    });
    const data = await res.json();
    setScheduleList(data);
  };

  useEffect(() => {
    fetchSchedule();
    fetchTeams();
  }, []);

  const updateSuccess = () => {
    fetchSchedule();
  }
  const createSuccess = () => {
    fetchSchedule();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>赛程</div>
          <div className="flex items-center">
            <Button className="mr-3">查询</Button>
            <Create teamList={teamList} submitSuccess={createSuccess} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>主队</TableHead>
              <TableHead>主队得分</TableHead>
              <TableHead>客队</TableHead>
              <TableHead>客队得分</TableHead>
              <TableHead>轮次</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleList.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.home_team.name}</TableCell>
                <TableCell>{schedule.home_score}</TableCell>
                <TableCell>{schedule.visiting_team.name}</TableCell>
                <TableCell>{schedule.visiting_score}</TableCell>
                <TableCell>{schedule.round}</TableCell>
                <TableCell>
                  {/* <Button variant="ghost" onClick={update(schedule)}>编辑</Button> */}
                  <Update
                    id={schedule.id}
                    teamList={teamList}
                    submitSuccess={updateSuccess}
                  />
                  <Button variant="ghost">删除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
