import { getAllJobs } from "@/lib/actions/jobs";
import { currentUser } from "@/lib/auth";
import { JobsQuery } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  const params = req.nextUrl.searchParams;
  const location = params.get("location");
  const type = params.get("type");
  // console.log(location, type);
  const query: JobsQuery = {};
  

  const jobs = await getAllJobs(query);
  if (!jobs) {
    return NextResponse.json({ error: "Failed fetching jobs" }, { status: 500 });
  }

  return NextResponse.json(jobs, { status: 200 });
}

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  

  return NextResponse.json({ message: "Success" }, { status: 201 });
}