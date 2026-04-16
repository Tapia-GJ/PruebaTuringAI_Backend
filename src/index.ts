import express, { urlencoded, json } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import workRoutes from "./routes/work.route.js";
import authorRoutes from "./routes/author.route.js";
import genreRoutes from "./routes/genres.route.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(json());
app.use(urlencoded({ extended: true }));

// Better Auth
app.all("/api/auth/*path", toNodeHandler(auth));

// Rutas de tu app
app.use("/api/works", workRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log(`OLA ${PORT}`);
});
