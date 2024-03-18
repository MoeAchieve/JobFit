import { getProfileById } from "@/lib/actions/profile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest,
  { params }: { params: { id: string } }) {
  const id = params.id;
  const profile = await getProfileById(id);

  if (!profile) {
    return NextResponse.json({ error: "Failed to get profile" }, { status: 500 });
  }

  return NextResponse.json({ profile }, { status: 200 });
}
