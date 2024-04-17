import { prisma } from "@/config/prisma";
import { HttpError } from "@/errors";
import { JobsQuery } from "@/types";

export async function getAllJobs(query: JobsQuery, skip: number, take: number) {
  let queryOptions = {};

  if (query.location) {
    queryOptions = {
      location: query.location
    };
  }

  if (query.type) {
    queryOptions = {
      ...queryOptions,
      type: query.type
    };
  }

  if (query.status) {
    queryOptions = {
      ...queryOptions,
      status: query.status
    };
  }

  try {
    const jobs = await prisma.job.findMany({
      where: {
        ...queryOptions
      },
      skip,
      take,
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

export async function createJob(data: any, userId: string) {
  try {
    const job = await prisma.job.create({
      data: {
        ...data,
        status: "Active",
        user: {
          connect: {
            id: userId
          }
        },
        company: {
          connect: {
            id: data.company
          }
        }
      }
    });
    return job;
  }
  catch (error) {
    return error;
  }
}

export async function updateJob(userId: string, id: number, data: any) {
  try {
    const job = await prisma.job.update({
      where: {
        id,
        userId
      },
      data
    });

    if (!job) {
      throw new HttpError("Unauthorized", 401);
    }

    return job;
  }
  catch (error) {
    return error;
  }
}

export async function deleteJob(id: number) {
  try {
    await prisma.job.delete({
      where: {
        id
      }
    });
    return { message: "Job deleted" };
  }
  catch (error) {
    return error;
  }
}

export async function getPostedJobs(userId: string) {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId
      }
    });
    return jobs;
  }
  catch (error) {
    return error;
  }
}

export async function getUserApplications(userId: string) {
  try {
    const applications = await prisma.applicantion.findMany({
      where: {
        userId
      }
    });
    return applications;
  }
  catch (error) {
    return error;
  }
}

export async function createJobApplication(userId: string, jobId: number, data: any) {
  try {
    const application = await prisma.applicantion.create({
      data: {
        ...data,
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
      }
    });
    return application;
  }
  catch (error) {
    return error;
  }
}

export async function getJobApplications(jobId: number, userId: string) {
  try {
    const applications = await prisma.applicantion.findMany({
      where: {
        jobId,
        userId
      }
    });
    return applications;
  }
  catch (error) {
    return error;
  }
}
