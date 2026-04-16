import {
  createAuthorSchema,
  updateAuthorSchema,
} from "../schemas/author.schema.js";
import { AuthorService } from "./../services/author.service.js";
import type { Request, Response } from "express";

export class AuthorController {
  static async getAll(req: Request, res: Response) {
    try {
      const authors = await AuthorService.getAll();
      res.json(authors);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: "Error al obtener los autores" });
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const author = await AuthorService.getById(id);
      if (!author)
        return res.status(404).json({ error: "Autor no encontrado" });

      res.json(author);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ error: "Error al obtener el autor" });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const validation = createAuthorSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const newAuthor = await AuthorService.create(validation.data);
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el autor" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const validation = updateAuthorSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const updatedAuthor = await AuthorService.update(id, validation.data);
      res.json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el autor" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      await AuthorService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el autor" });
    }
  }
}
