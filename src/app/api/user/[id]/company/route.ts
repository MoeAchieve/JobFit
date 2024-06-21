import { getUserCompanies } from '@/lib/actions/company';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const jobs = await getUserCompanies(id);
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
