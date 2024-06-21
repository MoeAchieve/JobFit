import { removeExperience, updateExperience } from "@/lib/actions/profile";
import { currentUser } from "@/lib/auth";
import { editExperienceSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const body = await req.json();

  const validated = editExperienceSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const experience = await updateExperience(parseInt(id), validated.data);

  if (!experience) {
    return NextResponse.json({ error: "Something Went Wrong!" }, { status: 404 });
  }

  return NextResponse.json({ experience }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const experience = await removeExperience(parseInt(id));

  if (!experience) {
    NextResponse.json({ error: "Something Went Wrong!" }, { status: 404 });
  }

  return NextResponse.json({ status: 204 });
}
