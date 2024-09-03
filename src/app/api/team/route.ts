import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.team.findMany();
  return Response.json(data);
}
