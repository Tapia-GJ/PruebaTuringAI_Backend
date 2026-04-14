import express, { urlencoded, json } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log(`OLA ${PORT} 🚀`);
});
