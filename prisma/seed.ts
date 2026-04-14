import { prisma } from "../src/config/db.js";

async function main() {
  console.log("Iniciando el seeding de la base de datos...");

  // rol USER
  const userRole = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: {
      id: 1,
      name: "USER",
    },
  });

  // rol ADMIN
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      id: 2,
      name: "ADMIN",
    },
  });

  console.log(userRole);
  console.log(adminRole);
}

main()
  .catch((e) => {
    console.error("Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
