import { NextFunction, Request, Response } from "express";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ auth: false, message: 'Acesso negado!' });
    next();
}