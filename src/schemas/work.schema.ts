import { z } from "zod";

export const createWorkSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  coverUrl: z.string().url("Debe ser una URL válida").optional(),
  publishYear: z.number().int().optional(),
  authorId: z.number().int().positive("El ID del autor es obligatorio"),
  genreIds: z.array(z.number().int().positive()).optional(),
});

export const updateWorkSchema = createWorkSchema.partial();
