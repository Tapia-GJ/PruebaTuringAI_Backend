import { prisma } from "../config/db.js";

export class WorkService {
  static async getAll() {
    return prisma.work.findMany({
      include: {
        // traer datos de otras tablas relacionadas
        author: true,
        workGenres: {
          include: {
            genre: true,
          }
        },
      },
    });
  }

  static async getById(id: number) {
    return prisma.work.findUnique({
      where: { id },
      include: { 
        author: true, 
        workGenres: {
          include: {
            genre: true,
          }
        },
      },
    });
  }

  static async create(data: any) {
    const { genreIds, ...workData } = data;
    
    return prisma.work.create({
      data: {
        ...workData,
        ...(genreIds && genreIds.length > 0 ? {
          workGenres: {
            create: genreIds.map((id: number) => ({
              genre: { connect: { id } }
            }))
          }
        } : {})
      },
      include: {
        author: true,
        workGenres: { include: { genre: true } }
      }
    });
  }

  static async update(id: number, data: any) {
    const { genreIds, ...workData } = data;

    return prisma.work.update({
      where: { id },
      data: {
        ...workData,
        ...(genreIds !== undefined ? {
          workGenres: {
            deleteMany: {}, // Limpiamos los géneros anteriores
            create: genreIds.map((gId: number) => ({
              genre: { connect: { id: gId } }
            }))
          }
        } : {})
      },
      include: {
        author: true,
        workGenres: { include: { genre: true } }
      }
    });
  }

  static async delete(id: number) {
    return prisma.work.delete({
      where: { id },
    });
  }
}
