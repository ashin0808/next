import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-static'

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.schedule.findMany({
    where: {
      round: 1
    }
  });
  return Response.json(data);
}
