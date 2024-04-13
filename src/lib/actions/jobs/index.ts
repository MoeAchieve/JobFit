import { prisma } from "@/config/prisma";
import { IJob, JobsQuery } from "@/types";

export async function getAllJobs(query: JobsQuery) {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        location: {
          in: query.location
        },
        type: {
          in: query.type
        }
      }
    });
    return jobs; 
  }
  catch (error) {
    return error;
  }
}

export async function getJobById(id: number) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id
      }
    });
    return job;
  }
  catch (error) {
    return error;
  }
}

export async function createJob(data: any) {
  try {
    const job = await prisma.job.create({
      data
    });
    return job;
  }
  catch (error) {
    return error;
  }
}

export async function createJobApplication(userId: string, jobId: number) {
  try {
    const application = await prisma.applicantion.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        job: {
          connect: {
            id: jobId
          }
        },
        status: "PENDING",
        //TODO: After implementing file upload, update this to the correct path
        resume: "",
        coverLetter: ""
      }
    });
    return application;
  }
  catch (error) {
    return error;
  }
}
