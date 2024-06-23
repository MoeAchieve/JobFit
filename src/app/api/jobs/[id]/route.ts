import { deleteJob, getJobById } from "@/lib/actions/jobs";
import { currentUser } from "@/lib/auth";
import { editJobSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = parseInt(params.id);

    const job = await getJobById(companyId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching job" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const jobId = parseInt(params.id);
    const body = await req.json();
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validated = editJobSchema.safeParse(body);
    
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    const updatedJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        ...validated.data,
      }
    });

    return NextResponse.json({ success: true, updatedJob }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed updating job" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
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
