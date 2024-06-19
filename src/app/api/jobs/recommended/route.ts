import { Job } from "@prisma/client";
import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      }
    });
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (jobs.length === 0) {
      return NextResponse.json({ success: false, message: "No jobs found" }, { status: 200 });
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        skills: true,
      }
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (!profile.skills) {
      return NextResponse.json({ error: "Please fill your profile first" }, { status: 404 });
    }

    const res = await fetch(`http://localhost:3000/api/models/predict/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile, jobs }),
    });


    const data = await res.json();
    if (data.id) {
      const recommendedJobs = data.id.map((id: number) => jobs.find((job: Job) => job.id === id));
      if (recommendedJobs.length === 0) {
        return NextResponse.json({ success: false, message: "No recommended jobs" }, { status: 200 });
      }
      const count = recommendedJobs.length;
      const pages = Math.ceil(count / 10);
      return NextResponse.json({ success: true, jobs: recommendedJobs, count, pages }, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Failed fetching jobs" }, { status: 500 });
  }
}
