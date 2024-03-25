import { update } from "@/auth";
import { uploadImage } from "@/lib/actions/user";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, _res: NextResponse) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { image } = await req.json();
  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const file = await uploadImage(user.id, image);
  if (!file) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }

  await update({
    user: {
      ...user,
      image: image,
    }
  });
  return NextResponse.json({ success: true, image: file }, { status: 200 });
}