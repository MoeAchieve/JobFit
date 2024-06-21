import { getCompanyById } from "@/lib/actions/company";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const company = await getCompanyById(id);
    if (!company) {
      return NextResponse.json({ error: "company not found" }, { status: 404 });
    }

    const jobs = await prisma.company.findMany({
      where: {
        id: id,
      },
      select: {
        jobs: {
          select: {
            applicants: {
              select: {
                id: true,
                status: true,
                createdAt: true,
                resume: true,
                coverLetter: true,
                user: {
                  select: {
                    email: true,
                    name: true,
                    image: true,
                  },
                },
                job: {
                  select: {
                    title: true,
                    location: true,
                    status: true,
                    createdAt: true,
                  },
                },
              },
            
            },
          },
        },
      }
    });

    const applicants = jobs[0].jobs.map((job) => job.applicants).flat();

    return NextResponse.json(applicants, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching company" }, { status: 500 });
  }
}
