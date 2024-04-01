import { addProfileSkill } from "@/lib/actions/profile";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
  req: NextRequest,
) {

  const body = await req.json();
  const { id } = body;
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(id);
  const skill = await addProfileSkill(user.id!, parseInt(id));
  if (!skill) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 400 });
  }

  return NextResponse.json({ skill }, { status: 201 });
}
