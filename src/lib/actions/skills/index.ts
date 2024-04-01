import { prisma } from '@/config/prisma';

export async function getAllSkills() {
  const skills = await prisma.skill.findMany();
  return skills;
}

export async function getSkillById(id: number) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });
  return skill;
}

export async function createSkill(data: { name: string }) {
  const skill = await prisma.skill.create({
    data,
  });
  return skill;
}

export async function updateSkill(id: number, data: { name: string }) {
  const skill = await prisma.skill.update({
    where: {
      id,
    },
    data,
  });
  return skill;
}

export async function deleteSkill(id: number) {
  const skill = await prisma.skill.delete({
    where: {
      id,
    },
  });
  return skill;
}
