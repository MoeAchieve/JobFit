import { getAllSkills } from "@/lib/actions/skills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
  res: NextResponse) {
  const skills = await getAllSkills();
  if (!skills) {
    return NextResponse.json({ error: "No skills found" }, { status: 500 });
  }
  return NextResponse.json(skills);
}