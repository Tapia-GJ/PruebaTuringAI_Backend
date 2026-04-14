import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../config/auth.js";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res
        .status(401)
        .json({ message: "No autorizado. Inicia sesión primero." });
      return;
    }

    res.locals.user = session.user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor al verificar sesión" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res
        .status(401)
        .json({ message: "No autorizado. Inicia sesión primero." });
      return;
    }

    if (session.user.roleId !== 2) {
      res.status(403).json({
        message: "Acceso denegado. Se requieren permisos de administrador.",
      });
      return;
    }

    res.locals.user = session.user;
    next();
  } catch (error) {
    console.error("Error en isAdmin:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al verificar permisos" });
  }
};
