import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { prisma } from "../db";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET as string) as { id: string };
    req.userId = decoded.id;
    next();
}
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.users.findUnique({
        where: {
            id: req.userId
        }
    })
    if (!user || user.role !== "ADMIN") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
}