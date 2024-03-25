import { update } from '@/auth';
import { updateUser } from '@/lib/actions/user';
import { currentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name or email are required" }, { status: 400 });
  }

  const updated = await updateUser(user.id, { name });
  if (!updated) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  await update({
    user: {
      ...user,
      name,
    }
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
