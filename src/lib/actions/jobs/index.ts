import { prisma } from "@/config/prisma";
import { HttpError } from "@/errors";
import { JobsQuery } from "@/types";
import { JOB_STATUS, Job } from "@prisma/client";

export async function getAllJobs(query: JobsQuery, skip: number, take: number) {
  let queryOptions = {};

  if (query.location) {
    queryOptions = {
      location: {
        in: query.location
      }
    };
  }

  if (query.type) {
    queryOptions = {
      ...queryOptions,
      type: {
        in: query.type
      }
    }
  }

  if (query.status) {
    switch (query.status) {
      case 0:
        queryOptions = {
          ...queryOptions,
          status: ["Active", "Expired", "Archived"]
        };
        break;
      case 1:
        queryOptions = {
          ...queryOptions,
          status: JOB_STATUS.Active
        };
        break;
      case 2:
        queryOptions = {
          ...queryOptions,
          status: JOB_STATUS.Archived
        };
        break;
      case 3:
        queryOptions = {
          ...queryOptions,
          status: JOB_STATUS.Expired
        };
        break;
      default:
        break;
    }
  }

  if (query.keyword) {
    queryOptions = {
      ...queryOptions,
      OR: [
        {
          title: {
            contains: query.keyword
          }
        },
        {
          description: {
            contains: query.keyword
          }
        }
      ]
    }
  }

  if (query.recruiterId) {
    queryOptions = {
      ...queryOptions,
      userId: query.recruiterId,
    }
  }

  try {
    const [jobs, count] = await prisma.$transaction([
      prisma.job.findMany({
        where: queryOptions,
        skip,
        take,
        include: {
          company: true,
        }
      }),
      prisma.job.count({
        where: queryOptions
       })
    ]);
    return { jobs, count };
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
    const hasUserApplied = await prisma.applicantion.findFirst({
      where: {
        userId,
        jobId
      }
    });

    if (hasUserApplied) {
      throw new HttpError("User has already applied for this job", 400);
    }
    console.log(data);

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

    if (!application) {
      throw new HttpError("Failed to apply for job", 500);
    }
    return application;
  }
  catch (error) {
    throw error;
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
    throw error;
  }
}
