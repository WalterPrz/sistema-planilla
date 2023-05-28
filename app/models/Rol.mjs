import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {  PermisoRol, Usuario } from "./index.mjs";
class Rol extends Model {
    static associate() {
        this.hasMany(PermisoRol, {
            foreignKey: 'id_rol'
        })
        this.hasMany(Usuario, {
            foreignKey: 'id_rol'
        })
    }
}
Rol.init(
    {
        id_rol: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        descripcion_rol: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_rol: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'rol',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "pk_rol",
                unique: true,
                fields: [
                    { name: "id_rol" },
                ]
            },
            {
                name: "rol_pk",
                unique: true,
                fields: [
                    { name: "id_rol" },
                ]
            },
        ]
    }
);
export default Rol;
