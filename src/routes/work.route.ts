import { Router } from "express";
import { WorkController } from "../controllers/work.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Work:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del cómic
 *         title:
 *           type: string
 *           description: Título del cómic
 *         description:
 *           type: string
 *           description: Descripción o sinopsis
 *         coverUrl:
 *           type: string
 *           nullable: true
 *           description: URL de la portada
 *         publishYear:
 *           type: integer
 *           nullable: true
 *           description: Año de publicación
 *         authorId:
 *           type: integer
 *           description: ID del autor
 *       example:
 *         title: "Spider-Man"
 *         description: "Un cómic clásico"
 *         coverUrl: "http://imagen.com/spider.png"
 *         publishYear: 2002
 *         authorId: 1
 */

/**
 * @swagger
 * /api/works:
 *   get:
 *     summary: Obtiene todos los cómics
 *     tags: [Works]
 *     description: Endpoint para listar todos los works (Cualquier usuario logueado)
 *     responses:
 *       200:
 *         description: Lista de cómics obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Work'
 *       401:
 *         description: No autorizado
 */
router.get("/", isAuthenticated, WorkController.getAll);

/**
 * @swagger
 * /api/works/{id}:
 *   get:
 *     summary: Obtiene un cómic por ID
 *     tags: [Works]
 *     description: Obtiene los detalles de un cómic específico (Cualquier usuario logueado)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del cómic
 *     responses:
 *       200:
 *         description: Cómic obtenido
 *       404:
 *         description: Cómic no encontrado
 */
router.get("/:id", isAuthenticated, WorkController.getById);

/**
 * @swagger
 * /api/works:
 *   post:
 *     summary: Crea un nuevo cómic
 *     tags: [Works]
 *     description: Requiere permisos de administrador (roleId 2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Work'
 *     responses:
 *       201:
 *         description: Cómic creado exitosamente
 *       400:
 *         description: Errores de validación
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.post("/", isAdmin, WorkController.create);

/**
 * @swagger
 * /api/works/{id}:
 *   put:
 *     summary: Actualiza un cómic existente
 *     tags: [Works]
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
 *             $ref: '#/components/schemas/Work'
 *     responses:
 *       200:
 *         description: Cómic actualizado
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.put("/:id", isAdmin, WorkController.update);

/**
 * @swagger
 * /api/works/{id}:
 *   delete:
 *     summary: Elimina un cómic
 *     tags: [Works]
 *     description: Requiere permisos de administrador (roleId 2)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cómic eliminado correctamente
 *       403:
 *         description: Acceso denegado, se requiere rol ADMIN
 */
router.delete("/:id", isAdmin, WorkController.delete);

export default router;
