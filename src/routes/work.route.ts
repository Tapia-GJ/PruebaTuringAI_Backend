import { Router } from "express";
import { WorkController } from "../controllers/work.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = Router();

// Rutas de lectura (Cualquier usuario logueado puede ver)
router.get("/", isAuthenticated, WorkController.getAll);
router.get("/:id", isAuthenticated, WorkController.getById);

// Rutas de escritura/modificación (SOLO Administradores)
router.post("/", isAdmin, WorkController.create);
router.put("/:id", isAdmin, WorkController.update);
router.delete("/:id", isAdmin, WorkController.delete);

export default router;
