import { prisma } from "@/config/prisma";

export async function getAllJobs() {
  try {
    const jobs = await prisma.job.findMany();
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
