import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Rol extends Model {
    public id!: number;
    public nombre!: string;
}

export interface RoleI {
    nombre: string;
}

export enum RoleNames {
    ADMIN = "admin",
    OBSERVADOR = "observador",
    // ESTUDIANTE = "estudiante"
}

Rol.init(
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
    },
    {
        tableName: "roles",
        sequelize: database,
        timestamps: true,
        hooks: {
            async afterSync(){
                const registros = await Rol.count();
                if(registros === 0){
                    Rol.bulkCreate([
                        { nombre: RoleNames.ADMIN },
                        { nombre: RoleNames.OBSERVADOR },
                    ]);
                }
            }
        }
    }
);