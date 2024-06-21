import { currentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/config/prisma';

export async function GET(_req: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    if (user.id !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const jobs = await prisma.applicantion.findMany({
      where: {
        userId: id,
      },
      include: {
        job: true,
      },
    });
    
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
