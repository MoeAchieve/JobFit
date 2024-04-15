import { createJobApplication, getJobApplications } from "@/lib/actions/jobs";
import { currentUser } from "@/lib/auth";
import { applicationSchema } from "@/lib/schemas";
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
    return NextResponse.json({ error: "Failed updating job" }, { status: 500 });
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

    const validated = applicationSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors }, { status: 400 });
    }

    const applicantion = await createJobApplication(user.id, jobId, validated);
    return NextResponse.json(applicantion, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed updating job" }, { status: 500 });
  }
}
