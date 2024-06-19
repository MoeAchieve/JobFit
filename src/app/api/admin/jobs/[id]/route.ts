import { HttpError } from "@/errors";
import { updateJobStatus } from "@/lib/actions/admin";
import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req: NextResponse,
  { params }: { params: { id: string } }) {
  try {
    const isAdmin = await currentRole();
    if (!isAdmin) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 });
    }
    const jobId = parseInt(params.id);
    const body = await req.json();
    if (!body.status) {
      return NextResponse.json({
        error: 'Status is required',
      }, { status: 400 });
    }
    const { status } = body;
    await updateJobStatus(jobId, status);
    return NextResponse.json({ success: true }, { status: 200 });
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
