import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { Usuario } from './Usuario';
import { Zona } from './Zona';

export class Observacion extends Model {
    public id!: number;
    public ph!: number;
    public oxigeno!: number;
    public amonio!: number;
    public nitrato!: number;
    public nitrito!: number; 
    public temperatura!: number;
    public fecha!: Date;
    public zonaId!: number;
    public usuarioId!: number;
}

export interface ObservacionI {
    ph: number;
    oxigeno: number;
    amonio: number;
    nitrato: number;
    nitrito: number;
    temperatura: number;
    fecha: Date;
    zonaId: number;
    usuarioId: number;
}

Observacion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ph: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        oxigeno: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        amonio: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        nitrato: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        nitrito: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        temperatura: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
        fecha: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        zonaId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Zona,
                key: 'id'
            }
        },
        usuarioId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id'
            }
        },
    },
    {
        tableName: "observaciones",
        sequelize: database,
        timestamps: true,
    }
);

Observacion.belongsTo(Zona, { foreignKey: 'zonaId' });
Observacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });