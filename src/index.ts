import express, { urlencoded, json } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import workRoutes from "./routes/work.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.all("/api/auth/*path", toNodeHandler(auth));

app.use("/api/works", workRoutes);

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log(`OLA ${PORT}`);
});
