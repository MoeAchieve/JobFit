import { update } from '@/auth';
import { updateUser } from '@/lib/actions/user';
import { currentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name or email are required" }, { status: 400 });
  }

  await updateUser(user.id, { name });

  await update({
    user: {
      ...user,
      name,
    }
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
