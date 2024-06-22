import { currentUser } from "@/lib/auth";
import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "@prisma/client";
import { MailService } from "@/lib/mail";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationId = parseInt(params.id);
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    if (!Object.values(Status).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const applicantion = await prisma.applicantion.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        id: true,
        status: true,
        job: {
          select: {
            userId: true,
          }
        }
      }
    });

    if (!applicantion) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (applicantion.job.userId !== user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedApplication = await prisma.applicantion.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            email: true,
            name: true,
          }
        },
        job: {
          select: {
            company: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });
    

    const mail = new MailService();
    if (status === Status.APPROVED && updatedApplication.user.email && updatedApplication.user.name && updatedApplication.job.company.name) {
      await mail.sendAcceptEmail(
        updatedApplication.user.email,
        updatedApplication.user.name,
        updatedApplication.job.company.name,
        `Hello ${updatedApplication.user.name}, your application to ${updatedApplication.job.company.name} has been accepted.`
      );
    }

    if (status === Status.REJECTED && updatedApplication.user.email && updatedApplication.user.name && updatedApplication.job.company.name) {
      await mail.sendRejectEmail(
        updatedApplication.user.email,
        updatedApplication.user.name,
        updatedApplication.job.company.name,
        `Hello ${updatedApplication.user.name}, your application to ${updatedApplication.job.company.name} has been rejected.`
      );
    }

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Process failed" }, { status: 500 });
  }
}
