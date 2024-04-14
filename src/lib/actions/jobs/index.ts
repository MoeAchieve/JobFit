import { prisma } from "@/config/prisma";
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

export async function updateJob(id: number, data: any) {
  try {
    const job = await prisma.job.update({
      where: {
        id
      },
      data
    });

    if (!job) {
      return null;
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
