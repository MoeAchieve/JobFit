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

export const getUsers = async () => {
  try {
    return prisma.user.findMany();
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
}

export const getCompanyByUserId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        companies: true,
      },
    });
    return user?.companies[0];
  } catch (error) {
    return error;
  }
}

export const uploadImage = async (id: string, path: string) => {
  try {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        image: path,
      }
      }
    )
  } catch (error) {
    return error;
  }
}
