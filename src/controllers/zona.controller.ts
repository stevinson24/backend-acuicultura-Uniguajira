import { Request, Response, NextFunction } from "express";
import { Zona, ZonaI } from "../models/Zona";
import { where } from "sequelize";

export class ZonaController {

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleId'];
            if (rol !== '1' && rol !== '2') {
                res.status(401).json({ message: 'No tienes permiso para realizar esta acción' });
                return;
            }
            const result: ZonaI[] = await Zona.findAll();
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleID'];
            if (rol !== '1' && rol !== '2') {
                res.status(401).json({ message: 'No tienes permiso para realizar esta acción' });
                return;
            }
            const { id } = req.params;
            const result = await Zona.findByPk(id) as ZonaI;
            if (result) {
                res.status(200).json(result);
                return;
            }
            res.status(404).json({ message: 'Zona no encontrada' });
        } catch (error) {
            next(error)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleID'];
            if (rol !== '1') {
                res.status(401).json({ message: 'No tienes permiso para realizar esta acción' });
                return;
            }
            const data: ZonaI = req.body;
            const result = await Zona.create({...data});
            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleID'];
            if (rol !== '1') {
                res.status(401).json({ message: 'No tienes permiso para realizar esta acción' });
                return;
            }
            const { id } = req.params;
            
            const zona = await Zona.findByPk(id);
            if (zona) {
                const data = req.body as ZonaI;
                const newZona = await zona.update(data, {where: {id: id}});
                res.status(200).json(newZona);
                return;
            }
            res.status(404).json({ message: 'Zona no encontrada' });
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const rol = req.headers['roleID'];
            if (rol !== '1') {
                res.status(401).json({ message: 'No tienes permiso para realizar esta acción' });
                return;
            }
            const { id } = req.params;
            const zona = await Zona.findByPk(id);
            if (zona) {
                await zona.destroy();
                res.status(204).json({message: 'Zona eliminada'});
                return;
            }
            res.status(404).json({ message: 'Zona no encontrada' });
        } catch (error) {
            next(error)
        }
    }
}