import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usuario, UsuarioI } from "../models/Usuario";

export class AuthController {

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as UsuarioI;
            const newUser = Usuario.create({...user});
            res.json(newUser);
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction){
        try {
            const usuario = req.body as UsuarioI;
            const user = await Usuario.findOne({where: {email: usuario.email}});
            if(!user || !bcrypt.compareSync(usuario.password, user.password)){
                res.status(401).json({message: 'Invalid email or password'});
                return;
            }

            const data = {
                userId: user.id.toString(),
                roleId: user.roleId.toString()
            }

            const token = jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: process.env.JWT_EXPIRES_TIME
            });

            res.json({token});
        } catch (error) {
            next(error);
        }
    }
}
