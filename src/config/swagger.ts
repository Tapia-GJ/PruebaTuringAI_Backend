import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cómics (Turing AI)",
      version: "1.0.0",
      description: "Documentación de los endpoints del backend para el CRUD de Works y roles de usuario.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "better-auth.session_token", // Cookie generada por Better Auth
          description: "La cookie de sesión generada automáticamente al hacer login"
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  // Rutas donde Swagger va a buscar los comentarios de documentación
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);