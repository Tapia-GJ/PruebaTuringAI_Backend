import { prisma } from "../src/config/db.js";
import bcrypt from "bcrypt";

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

  console.log("Roles creados:", userRole, adminRole);

  const hashedPassword = await bcrypt.hash("password123", 10);

  const normalUser = await prisma.user.upsert({
    where: { email: "user@turing.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      id: "user-cuid-1",
      name: "Normal User",
      email: "user@turing.com",
      password: hashedPassword,
      roleId: userRole.id,
    },
  });

  await prisma.account.upsert({
    where: { id: "acc-user-1" },
    update: { password: hashedPassword },
    create: {
      id: "acc-user-1",
      accountId: normalUser.email,
      providerId: "credential",
      userId: normalUser.id,
      password: hashedPassword,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@turing.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      id: "admin-cuid-2",
      name: "Admin User",
      email: "admin@turing.com",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  await prisma.account.upsert({
    where: { id: "acc-admin-2" },
    update: { password: hashedPassword },
    create: {
      id: "acc-admin-2",
      accountId: adminUser.email,
      providerId: "credential",
      userId: adminUser.id,
      password: hashedPassword,
    },
  });

  console.log("Usuarios creados:");
  console.log({
    user: normalUser.email,
    admin: adminUser.email,
    password: "password123",
  });
}

main()
  .catch((e) => {
    console.error("Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
