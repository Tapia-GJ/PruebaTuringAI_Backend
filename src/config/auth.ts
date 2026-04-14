import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mariadb" if better-auth supports it, mysql is standard for prisma
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "user", // The prisma model name
    additionalFields: {
      roleId: {
        type: "number",
        required: true,
        defaultValue: 1, // Default Role ID (e.g., READER)
      },
    },
  },
});
