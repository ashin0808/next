import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  if (searchParams.has('id')) {
    const data = await prisma.schedule.findUnique({
      where: {
        id: Number(searchParams.get('id')),
      },
    });
    return Response.json(data);
  } else {
    const data = await prisma.schedule.findMany({
      include: {
        home_team: true,
        visiting_team: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return Response.json(data);
  }
}

export async function POST(req: NextRequest) {
  const res = await req.json()
  console.log("res", res);
  
  const data = await prisma.schedule.create({
    data: res,
  });
  return Response.json(data);
}

export async function PUT(req: NextRequest) {
  const res = await req.json()
  const data = await prisma.schedule.update({
    where: {
      id: res.id,
    },
    data: res,
  });
  return Response.json(data);
}
