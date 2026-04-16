import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export const updateGenreSchema = createGenreSchema.partial();
