import { createJobApplication, getJobById } from "@/lib/actions/jobs";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const job = await getJobById(id);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job, { status: 200 });
}

// export async function POST(
//   req: NextResponse,
//   { params }: { params: { id: string } }
// ) {
//   const user = await currentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const jobId = parseInt(params.id);

//   const application = await createJobApplication(user.id, jobId);

//   if (!application) {
//     return NextResponse.json({ error: "Failed to apply for job" }, { status: 500 });
//   }
  
//   return NextResponse.json({ application }, { status: 201 });
// }