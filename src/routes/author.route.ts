import { Router } from "express";
import { AuthorController } from "../controllers/author.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           description: nombre del autor
 *       example:
 *         id: 1
 *         name: "Stan Lee"
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Obtiene todos los autores
 *     tags: [Authors]
 *     description: Endpoint para listar todos los autores
 *     responses:
 *       200:
 *         description: Lista de autores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       401:
 *         description: No autorizado
 */
router.get("/", isAuthenticated, AuthorController.getAll);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Obtiene un autor por ID
 *     tags: [Authors]
 *     description: Obtiene los detalles de un autor específico (Cualquier usuario logueado)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del autor
 *     responses:
 *       200:
 *         description: Autor obtenido
 *       404:
 *         description: Autor no encontrado
 */
router.get("/:id", isAuthenticated, AuthorController.getById);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Crea un nuevo autor
 *     tags: [Authors]
 *     description: Requiere permisos de administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 *       400:
 *         description: Errores de validación
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.post("/", isAdmin, AuthorController.create);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Actualiza un autor existente
 *     tags: [Authors]
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Autor actualizado
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.put("/:id", isAdmin, AuthorController.update);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Elimina un autor
 *     tags: [Authors]
 *     description: Requiere permisos de administrador (roleId 2)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Autor eliminado correctamente
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.delete("/:id", isAdmin, AuthorController.delete);

export default router;
