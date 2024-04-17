import { HttpError } from "@/errors";
import { makeAdmin } from "@/lib/actions/admin";
import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse,
  { params }: { params: { id: string } }) {
  try {
    const isAdmin = await currentRole();
    if (!isAdmin) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 });
    }
    const userId = params.id;
    const user = await makeAdmin(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    if (error instanceof HttpError) {
      return NextResponse.json({
        error: error.message,
      }, { status: error.statusCode });
    }
    return NextResponse.json({
      error: error,
    }, { status: 500 });
  }
}
