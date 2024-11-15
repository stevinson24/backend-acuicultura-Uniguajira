import { Request, Response, NextFunction } from 'express';
import { Observacion, ObservacionI } from '../models/Observacion';

export class ObservacionController{

    public async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1' && rol !== '2') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            if (rol === '1') {
                const observaciones = await Observacion.findAll() as ObservacionI[];
                res.json(observaciones);
                return;
            }

            const userId = req.headers['userId'] as string

            const observaciones = await Observacion.findAll(
                {
                    where: {usuarioId: userId}
                }
            ) as ObservacionI[];
            res.json(observaciones);
        } catch (error) {
            next(error);
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction){
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1' && rol !== '2') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const id = req.params['id']
            if(rol === '1'){
                const observacion = await Observacion.findByPk(id) as ObservacionI;
                if (!observacion) {
                    res.status(404).json({ message: 'Observacion no encontrada' });
                    return;
                }
                res.json(observacion);
                return;
            }

            const userId = req.headers['userId'] as string
            const observacion = await Observacion.findOne(
                {
                    where: {usuarioId: userId, id: id}
                }
            ) as ObservacionI;
            if (!observacion) {
                res.status(404).json({ message: 'Observacion no encontrada' });
                return;
            }
            res.json(observacion);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1' && rol !== '2') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const userId = req.headers['userId'] as string
            const observacion = req.body as ObservacionI;
            observacion.usuarioId = parseInt(userId);
            const newObservacion = await Observacion.create({ ...observacion });
            res.json(newObservacion);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1' && rol !== '2') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const newObservacion = req.body as ObservacionI;
            const id = req.params['id'];
            const observacion = await Observacion.findByPk(id);
            if (!observacion) {
                res.status(404).json({ message: 'Observacion no encontrada' });
                return;
            }

            await Observacion.update(newObservacion, { where: { id } });
            res.json({ message: 'Observacion actualizada' });
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        try {
            const rol = req.headers['roleId'] as string
            if (rol !== '1' && rol !== '2') {
                res.status(403).json({ message: 'Desautorizado' });
                return;
            }

            const id = req.params['id'];
            const observacion = await Observacion.findByPk(id);
            if (!observacion) {
                res.status(404).json({ message: 'Observacion no encontrada' });
                return;
            }

            await Observacion.destroy({ where: { id } });
            res.json({ message: 'Observacion eliminada' });
        } catch (error) {
            next(error);
        }
    }
}