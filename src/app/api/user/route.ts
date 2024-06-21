import { update } from '@/auth';
import { getUserById, updateUser } from '@/lib/actions/user';
import { currentUser } from '@/lib/auth';
import { changeUserDataSchema } from '@/lib/schemas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const u = await currentUser();
  if (!u) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserById(u.id);
  return NextResponse.json({ user }, { status: 200 });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await req.json();
  const validated = await changeUserDataSchema.safeParseAsync(body);

  if (!validated.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = await updateUser(user.id, validated.data);
  if (!updated) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  await update({
    user: {
      ...user,
      ...validated.data,
    }
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
