import { prisma } from "@/config/prisma";
import { IProfile } from "@/types";

export async function getProfileById(id: string): Promise<IProfile> {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: id,
      },
      include: {
        experiences: {
          include: {
            company: true,
          },
        },
        educations: true,
        skills: true,
        languages: true,
      },
    });

    const res: IProfile = {
      bio: profile?.bio || "",
      location: profile?.location || "",
      website: profile?.website || "",
      experiences: profile?.experiences.map((experience: any) => ({
        ...experience,
        from: experience.from.toISOString(),
        to: experience.to.toISOString(),
        company: experience.company,
        length: experienceLength(experience.to.toString(), experience.from.toString()),
      })) || [],
      educations: profile?.educations.map((education: any) => ({
        ...education,
        from: education.from.toISOString(),
        to: education.to.toISOString(),
      })) || [],
      skills: profile?.skills.map((skill: any) => ({
        ...skill,
      })) || [],
      languages: profile?.languages.map((language: any) => ({
        ...language,
      })) || [],
    };
    return res;
  } catch (error) {
    throw error;
  }
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

export const addExperience = async (id: string, data: any) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        name: data.company,
      },
    });

    if (!company) {
      return prisma.experience.create({
        data: {
          ...data,
          company: {
            create: {
              name: data.company,
            },
          },
          profile: {
            connect: {
              userId: id,
            },
          },
        },
      });
    }

    return prisma.experience.create({
      data: {
        ...data,
        company: {
          connect: {
            id: company.id,
          },
        },
        profile: {
          connect: {
            userId: id,
          },
        },
      },
    });
  } catch (error) {
    return error;
  }
}

export const updateExperience = async (id: number, data: any) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        name: data.company,
      },
    });

    if (!company) {
      return prisma.experience.update({
        where: {
          id,
        },
        data: {
          ...data,
          company: {
            create: {
              name: data.company,
            },
          },
        },
      });
    }

    return prisma.experience.update({
      where: {
        id,
      },
      data: {
        ...data,
        company: {
          connect: {
            id: company.id,
          },
        },
      }
    });
  } catch (error) {
    return error;
  }
}

export const removeExperience = async (id: number) => {
  try {
    return prisma.experience.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
}

export const getExperienceById = async (id: number) => {
  try {
    return prisma.experience.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
}

const experienceLength = (to: string, from: string) => {
  const toDate = new Date(to);
  const fromDate = new Date(from);
  const diff = toDate.getTime() - fromDate.getTime();
  const months = Math.floor(diff / (1000 * 3600 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}m`;
  } else {
    return `${years}y ${remainingMonths}m`;
  }
}
