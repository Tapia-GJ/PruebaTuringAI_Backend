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

  // --- AUTORES ---
  // Usamos IDs fijos en el "where" porque "name" no es @unique en el esquema
  const authorCantwell = await prisma.author.upsert({
    where: { id: 1 },
    update: { name: "Christopher Cantwell" },
    create: { id: 1, name: "Christopher Cantwell" },
  });

  const authorLemire = await prisma.author.upsert({
    where: { id: 2 },
    update: { name: "Jeff Lemire" },
    create: { id: 2, name: "Jeff Lemire" },
  });

  const authorAaron = await prisma.author.upsert({
    where: { id: 3 },
    update: { name: "Jason Aaron" },
    create: { id: 3, name: "Jason Aaron" },
  });

  const authorTaylor = await prisma.author.upsert({
    where: { id: 4 },
    update: { name: "Tom Taylor" },
    create: { id: 4, name: "Tom Taylor" },
  });

  // --- GÉNEROS ---
  const genreDC = await prisma.genre.upsert({
    where: { id: 1 },
    update: { name: "DC Comics" },
    create: { id: 1, name: "DC Comics" },
  });

  const genreEventos = await prisma.genre.upsert({
    where: { id: 2 },
    update: { name: "Eventos DC" },
    create: { id: 2, name: "Eventos DC" },
  });

  // --- OBRAS ---
  const workDCKO = await prisma.work.upsert({
    where: { id: 1 }, // Usamos ID 1 como identificador
    update: {
      title: "DC K.O.",
      descripction:
        "DC no se anda con rodeos este otoño con DC K.O., un nuevo y masivo evento de cómics de los afamados escritores Joshua Williamson y Scott Snyder, que arranca en octubre. Imagina un torneo cósmico de alto riesgo donde héroes y villanos se lanzan a batallas de gladiadores en una colosal arena erigida en la Tierra, con cada nivel más brutal y simbólico que el anterior. ¿El objetivo? Generar suficiente Energía Omega para desafiar a un Darkseid casi divino y coronar a un nuevo Rey Omega.",
      coverUrl:
        "https://marmota.me/wp-content/uploads/2025/10/DC-K.O.-2025-001-001-1-999x1536.jpg",
      publishYear: 2025,
      authorId: authorCantwell.id,
    },
    create: {
      id: 1,
      title: "DC K.O.",
      descripction:
        "DC no se anda con rodeos este otoño con DC K.O., un nuevo y masivo evento de cómics de los afamados escritores Joshua Williamson y Scott Snyder, que arranca en octubre. Imagina un torneo cósmico de alto riesgo donde héroes y villanos se lanzan a batallas de gladiadores en una colosal arena erigida en la Tierra, con cada nivel más brutal y simbólico que el anterior. ¿El objetivo? Generar suficiente Energía Omega para desafiar a un Darkseid casi divino y coronar a un nuevo Rey Omega.",
      coverUrl:
        "https://marmota.me/wp-content/uploads/2025/10/DC-K.O.-2025-001-001-1-999x1536.jpg",
      publishYear: 2025,
      authorId: authorCantwell.id,
    },
  });

  await prisma.workGenre.upsert({
    where: {
      workId_genreId: {
        workId: workDCKO.id,
        genreId: genreDC.id,
      },
    },
    update: {},
    create: {
      workId: workDCKO.id,
      genreId: genreDC.id,
    },
  });

  await prisma.workGenre.upsert({
    where: {
      workId_genreId: {
        workId: workDCKO.id,
        genreId: genreEventos.id,
      },
    },
    update: {},
    create: {
      workId: workDCKO.id,
      genreId: genreEventos.id,
    },
  });
  console.log("Obra principal lista.");

  console.log("Géneros listos.");

  console.log("Autores listos.");

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
