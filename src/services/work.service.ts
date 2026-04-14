import { prisma } from "../config/db.js";

export class WorkService {
  static async getAll() {
    return prisma.work.findMany({
      include: {
        //traer datos de otras tablas relacionadas
        author: true,
        genres: true,
      },
    });
  }

  static async getById(id: number) {
    return prisma.work.findUnique({
      where: { id },
      include: { author: true, genres: true },
    });
  }

  static async create(data: any) {
    return prisma.work.create({
      data,
    });
  }

  static async update(id: number, data: any) {
    return prisma.work.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.work.delete({
      where: { id },
    });
  }
}
