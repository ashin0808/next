import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function fetchTeamData(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.team.findMany();
  res.status(200).json({ code: 200, data })
}
