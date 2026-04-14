import type { Request, Response } from "express";
import { WorkService } from "../services/work.service.js";
import { createWorkSchema, updateWorkSchema } from "../schemas/work.schema.js";

export class WorkController {
  static async getAll(req: Request, res: Response) {
    try {
      const works = await WorkService.getAll();
      res.json(works);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los cómics" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const work = await WorkService.getById(id);
      if (!work) return res.status(404).json({ error: "Cómic no encontrado" });

      res.json(work);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el cómic" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validation = createWorkSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const newWork = await WorkService.create(validation.data);

      res.status(201).json(newWork);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Error al crear el cómic. Verifica que el authorId exista.",
        });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const validation = updateWorkSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const updatedWork = await WorkService.update(id, validation.data);
      res.json(updatedWork);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el cómic" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam || "");
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      await WorkService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el cómic" });
    }
  }
}
