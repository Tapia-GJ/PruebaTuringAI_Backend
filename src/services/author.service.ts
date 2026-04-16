import { prisma } from "../config/db.js";

export class AuthorService {
  static async getAll() {
    return prisma.author.findMany();
  }

  static async getById(id: number) {
    return prisma.author.findUnique({
      where: { id },
    });
  }

  static async create(data: any) {
    return prisma.author.create({
      data,
    });
  }

  static async update(id: number, data: any) {
    return prisma.author.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.author.delete({
      where: { id },
    });
  }
}
