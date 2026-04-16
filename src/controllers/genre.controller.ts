import type { Request, Response } from "express";
import { GenreService } from "../services/genre.service.js";
import { createGenreSchema } from "../schemas/genre.schema.js";

export class GenreController {
  static async getAll(req: Request, res: Response) {
    try {
      const genres = await GenreService.getAll();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los géneros" });
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const genre = await GenreService.getById(id);
      if (!genre)
        return res.status(404).json({ error: "Género no encontrado" });
      res.json(genre);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el género" });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const validation = createGenreSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const newGenre = await GenreService.create(validation.data);
      res.status(201).json(newGenre);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el género" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const validation = createGenreSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const updatedGenre = await GenreService.update(id, validation.data);
      res.json(updatedGenre);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el género" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      await GenreService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el género" });
    }
  }
}
