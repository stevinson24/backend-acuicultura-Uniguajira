import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface tokenDecoded {
    userId: string;
    roleId: string;
}

export class AuthMiddleware {
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('No se encontro ningun token');
            res.status(403).json({ message: 'No se encontro ningun token' });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Token invalido');
            res.status(403).json({ message: 'Token invalido' });
            return;
        }

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET!) as tokenDecoded;
            req.headers['userId'] = data.userId;
            req.headers['roleId'] = data.roleId;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Desautorizado' });
        }
    }
}