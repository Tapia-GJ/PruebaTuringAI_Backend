import { prisma } from "../config/db.js";
export class GenreService {
  static async getAll() {
    return prisma.genre.findMany();
  }

  static async getById(id: number) {
    return await prisma.genre.findUnique({
      where: { id },
    });
  }

  static async create(data: any) {
    return await prisma.genre.create({
      data,
    });
  }

  static async update(id: number, data: any) {
    return await prisma.genre.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return await prisma.genre.delete({
      where: { id },
    });
  }
}
