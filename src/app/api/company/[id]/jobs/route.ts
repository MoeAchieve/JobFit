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

    const jobs = await prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        jobs: true,
      }
    })

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching company" }, { status: 500 });
  }
}
