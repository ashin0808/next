import { Card } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Schedule () {
  const scheduleData = await prisma.schedule.findMany();
  console.log(scheduleData);

  const scheduleList = [
    {
      date: '8-16',
      matches: [
        {
          no: 1,
          home: '湖人',
          away: '勇士',
          scoreHome: 100,
          scoreAway: 98
        },
        {
          no: 2,
          home: '快船',
          away: '火箭',
          scoreHome: 120,
          scoreAway: 110
        },
        {
          no: 3,
          home: '篮网',
          away: '凯尔特人',
          scoreHome: 85,
          scoreAway: 90
        },
        {
          no: 4,
          home: '篮网',
          away: '凯尔特人',
          scoreHome: 85,
          scoreAway: 90
        },
      ]
    }
  ]
  
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b flex">
        <div className="text-xl font-bold px-5">8月16日</div>
        <div className="flex-1 ml-5 flex">
        {
          scheduleList[0].matches.map((match) => (
            <div key={match.no} className="flex-1 flex flex-col items-center">
              <div className="font-bold">{match.home}</div>
              <div className="font-bold">{match.scoreHome} - {match.scoreAway}</div>
              <div className="font-bold">{match.away}</div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}