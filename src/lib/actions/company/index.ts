import { prisma } from "@/config/prisma";

export async function getAllCompanies() {
  try {
    return prisma.company.findMany();
  } catch (error) {
    return error;
  }
}