import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Team() {
  const teamList = await prisma.team.findMany();

  return (
    <div className="min-h-screen bg-white">
      {
        teamList.map((team) => (
          <div key={team.id} className="p-4 border-b">
            {team.name}
          </div>
        ))
      }
    </div>
  );
}