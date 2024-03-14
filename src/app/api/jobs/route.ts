import { getAllJobs } from "@/lib/actions/jobs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching jobs" }, { status: 500 });
  }
}
