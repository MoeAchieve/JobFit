const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const skills = require("./seeds/skills.json");
const jobs = require("./seeds/jobs.json");
const bcrypt = require("bcryptjs");

async function main() {
  await prisma.skill.deleteMany();
  console.log("Deleted records in skills table");

  await prisma.$queryRaw`ALTER TABLE Skill AUTO_INCREMENT = 1`;
  console.log("reset skills auto increment to 1");

  await prisma.skill.createMany({
    data: skills,
  });
  console.log("Seeded skills table");

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      password: hashedPassword,
      role: "ADMIN",
      profile: {
        create: {},
      },
      companies: {
        create: {
          name: "SiliconMaze",
          description: "Digital Transformation Company",
          location: "Lagos, Nigeria",
          website: "https://siliconmaze.com",
        },
      },
    },
  });

  const company = await prisma.company.findFirst({
    where: {
      user: {
        id: admin.id,
      },
    },
  });

  for (let job of jobs) {
    await prisma.job.create({
      data: {
        ...job,
        company: {
          connect: {
            id: company.id,
          },
        },
        user: {
          connect: {
            id: admin.id,
          },
        },
      },
    });
  }

  console.log("Initial admin created with company and jobs");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
