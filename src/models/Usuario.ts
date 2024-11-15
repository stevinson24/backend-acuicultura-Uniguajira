import { Model, DataTypes } from "sequelize";
import { hashSync } from 'bcrypt';
import { database } from "../database/db";
import { ApiError } from "../errors/api.error";
import { Rol } from "./Rol";

export class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public password!: string;
    public birthday!: Date;
    public roleId!: number;
}

export interface UsuarioI {
    nombre: string;
    email: string;
    password: string;
    birthday: Date;
    roleId: number;
}

Usuario.init(
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
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        birthday: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        roleId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            references: {
                model: Rol,
                key: 'id'
            }
        },
    },
    {
        tableName: "usuarios",
        sequelize: database,
        timestamps: true,
        hooks: {
            beforeCreate(user: Usuario) {
                if (user.password) {
                    user.password = hashSync(user.password, 10);
                    return;
                }
                throw new ApiError('Password is required');
            },
            beforeUpdate(user: Usuario) {
                if (user.changed('password')) {
                    user.password = hashSync(user.password, 10);
                    return;
                }
            },
            async afterSync() {
                const registros = await Usuario.count();
                if (registros === 0) {
                    Usuario.create({
                        nombre: 'admin',
                        email: 'admin@uniguajira.edu.co',
                        password: 'admin',
                        birthday: new Date(),
                        roleId: 1
                    });

                    Usuario.create({
                        nombre: 'steven',
                        email: 'steven@uniguajira.edu.co',
                        password: 'steven',
                        birthday: new Date(),
                        roleId: 2
                    });
                }
            }
        }
    }
);

Usuario.belongsTo(Rol, { foreignKey: 'roleId' });