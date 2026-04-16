import { Router } from "express";
import { GenreController } from "../controllers/genre.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           description: nombre del género
 *       example:
 *         id: 1
 *         name: "Stan Lee"
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Obtiene todos los géneros
 *     tags: [Genres]
 *     description: Endpoint para listar todos los géneros
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       401:
 *         description: No autorizado
 */
router.get("/", isAuthenticated, GenreController.getAll);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Obtiene un género por ID
 *     tags: [Genres]
 *     description: Obtiene los detalles de un género específico (Cualquier usuario logueado)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del género
 *     responses:
 *       200:
 *         description: Género obtenido
 *       404:
 *         description: Género no encontrado
 */
router.get("/:id", isAuthenticated, GenreController.getById);

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Crea un nuevo género
 *     tags: [Genres]
 *     description: Requiere permisos de administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: Género creado exitosamente
 *       400:
 *         description: Errores de validación
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.post("/", isAdmin, GenreController.create);

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Actualiza un género existente
 *     tags: [Genres]
 *     description: Requiere permisos de administrador (roleId 2)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Género actualizado
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.put("/:id", isAdmin, GenreController.update);

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Elimina un género
 *     tags: [Genres]
 *     description: Requiere permisos de administrador (roleId 2)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Género eliminado correctamente
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.delete("/:id", isAdmin, GenreController.delete);

export default router;
