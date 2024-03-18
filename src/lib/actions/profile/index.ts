import { prisma } from "@/config/prisma";

export async function getProfileById(id: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    include: {
      experiences: true,
      educations: true,
      skills: true,
      languages: true,
    },
  });

  return profile;
}

export const editProfile = async (id: string, data: any) => {
  try {
    return prisma.profile.update({
      where: {
        userId: id,
      },
      data,
    });
  } catch (error) {
    return error;
  }
}
