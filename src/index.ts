import express, { urlencoded, json } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.all("/api/auth/*path", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log(`OLA ${PORT}`);
});
