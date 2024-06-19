import { prisma } from "@/config/prisma";

export async function getAllCompanies() {
  try {
    return prisma.company.findMany();
  } catch (error) {
    return error;
  }
}

export async function createCompany(userId: string, data: any) {
  try {

    const company = await prisma.company.create({
      data: {
        ...data,
        recruiterId: userId,
      },
    });
    return company;
  } catch (error) {
    return error;
  }
}

export async function getCompanyById(id: number) {
  try {
    return prisma.company.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function updateCompany(id: number, data: any) {
  try {
    return prisma.company.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function getUserCompanies(recruiterId: string) {
  try {
    const companies = await prisma.company.findMany({
      where: {
        recruiterId,
      }
    })
    return companies;
  } catch (error) {
    return error;
  }
}
