import { getUsers } from "@/lib/actions/user";
import { currentRole } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
  res: NextResponse) {
  try {
    const isAdmin = await currentRole();
    if (!isAdmin) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 });
    }
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  }
  catch (error: any) {
    return NextResponse.json({
      error: error,
    }, { status: 500 });
  }
}