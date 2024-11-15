import { Rol } from "../models/Rol";
import { Usuario, UsuarioI } from "../models/Usuario";
import { Request, Response, NextFunction } from 'express';

export class UserController {

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1') {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }

            const users = await Usuario.findAll({include: [{model: Rol}]});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const id = req.params['id']
            console.log(id);
            const user = await Usuario.findByPk(id);
            if (!user) {
                res.status(404).json({ message: 'usuario no encontrado' })
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const user = req.body as UsuarioI;
            const newUser = await Usuario.create({ ...user });
            res.json(newUser);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'] as string
            if (rol == '1' || rol == '2') {
                const id = req.params['id'];
                const user = await Usuario.findByPk(id);
                if (user) {
                    res.status(404).json({ message: 'usuario no encontrado' })
                    return;
                }

                const updateUser = req.body as UsuarioI;
                await Usuario.update(updateUser, { where: { id } });
                res.json({ message: 'Usuario actualizado' });
                return;
            }
            res.status(403).json({ message: 'Desautorizado' });
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const id = req.params['id'];
            const user = await Usuario.findByPk(id);
            if (user) {
                res.status(404).json({ message: 'usuario no encontrado' })
                return;
            }

            await Usuario.destroy({ where: { id } });
            res.json({ message: 'Usuario eliminado' });
        } catch (error) {
            next(error);
        }
    }
}