import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Zona extends Model {
    public id!: number;
    public nombre!: string;
    public ubicacion!: string;
    public descripcion!: string;
}

export interface ZonaI {
    nombre: string;
    ubicacion: string;
    descripcion: string;
}

Zona.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        ubicacion: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        descripcion: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "zonas",
        sequelize: database,
        timestamps: true,
        hooks: {
            async afterSync(){
                const registros = await Zona.count();
                if(registros === 0){
                    Zona.bulkCreate([
                        { nombre: 'Zona 1', ubicacion: 'Ubicacion 1', descripcion: 'Descripcion 1' },
                        { nombre: 'Zona 2', ubicacion: 'Ubicacion 2', descripcion: 'Descripcion 2' },
                        { nombre: 'Zona 3', ubicacion: 'Ubicacion 3', descripcion: 'Descripcion 3' },
                    ]);
                }
            }
        }
    }
);