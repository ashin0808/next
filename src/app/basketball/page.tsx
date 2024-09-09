export const dynamic = 'force-dynamic';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Standings from "./standings";
import FirstRound from "./firstRound";

export default async function Basketball() {
  return (
    <div className="min-h-screen px-20 py-10 flex">
      <Card className="flex-1">
        <Tabs defaultValue="standings">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="standings">积分榜</TabsTrigger>
            <TabsTrigger value="firstRound">小组赛第一轮</TabsTrigger>
            <TabsTrigger value="secondRound">小组赛第二轮</TabsTrigger>
            <TabsTrigger value="knockout">淘汰赛</TabsTrigger>
          </TabsList>
          <TabsContent value="standings">
            <Standings />
          </TabsContent>
          <TabsContent value="firstRound">
            <FirstRound />
          </TabsContent>
          <TabsContent value="secondRound">小组赛第二轮</TabsContent>
          <TabsContent value="knockout">淘汰赛</TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
