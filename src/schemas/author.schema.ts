import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export const updateAuthorSchema = createAuthorSchema.partial();
