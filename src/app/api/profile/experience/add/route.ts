import { addExperience } from "@/lib/actions/profile";
import { currentUser } from "@/lib/auth";
import { addExperienceSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validated = addExperienceSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({ error: "Invlaid input" }, { status: 400 });
  }

  const experience = await addExperience(user.id!, validated.data);
  if (!experience) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 404 });
  }

  return NextResponse.json({ experience }, { status: 201 });
}
