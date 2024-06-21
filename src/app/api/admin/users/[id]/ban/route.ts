import { HttpError } from "@/errors";
import { banUser } from "@/lib/actions/admin";
import { currentRole } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await currentRole();
    if (!isAdmin) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 });
    }
    const userId = params.id;
    await banUser(userId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
