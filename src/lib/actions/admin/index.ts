import { prisma } from '@/config/prisma';
import { HttpError } from '@/errors';
import { JOB_STATUS } from '@prisma/client';

export async function makeAdmin(id: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new HttpError('User not found', 404);
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: 'ADMIN',
      },
    });
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function banUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    if (user.banned) {
      throw new HttpError('User is already banned', 400);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        banned: true,
      },
    });
    return null;
  } catch (error: any) {
    throw error;
  }
}

export async function unbanUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    if (!user.banned) {
      throw new HttpError('User is not banned', 400);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        banned: false,
      },
    });
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function updateJobStatus(id: number, status: string) {
  
}
