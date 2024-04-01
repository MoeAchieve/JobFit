import { removeProfileSkill } from "@/lib/actions/profile";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skillId = params.id;

  const skill = await removeProfileSkill(user.id!, parseInt(skillId));
  if (!skill) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 400 });
  }

  return NextResponse.json({ status: 204 });
}
