import { deleteJob, getJobById, updateJob } from "@/lib/actions/jobs";
import { editJobSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching job" }, { status: 500 });
  }
}

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const validated = editJobSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors }, { status: 400 });
    }

    await updateJob(id, validated);

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed updating job" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await deleteJob(id);

    return NextResponse.json({ message: "Job deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed deleting job" }, { status: 500 });
  }
}
