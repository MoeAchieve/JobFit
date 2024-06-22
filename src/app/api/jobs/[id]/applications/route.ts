import { HttpError } from "@/errors";
import { createJobApplication, getJobApplications } from "@/lib/actions/jobs";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobId = parseInt(params.id);
    const applicantions = await getJobApplications(jobId, user.id);
    return NextResponse.json(applicantions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Process failed" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const jobId = parseInt(params.id);

   await createJobApplication(user.id, jobId, body);
    return NextResponse.json({ success: true });
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
