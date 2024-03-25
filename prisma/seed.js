const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const skills = require("./seeds/skills.json");

async function main() {
  await prisma.skill.deleteMany();
  console.log("Deleted records in skills table");

  await prisma.$queryRaw`ALTER TABLE Skill AUTO_INCREMENT = 1`;
  console.log("reset skills auto increment to 1");

  await prisma.skill.createMany({
    data: skills,
  });
  console.log("Seeded skills table");
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
