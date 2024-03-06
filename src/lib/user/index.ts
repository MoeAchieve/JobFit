import { prisma } from "@/config/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return null;
  }
};
