import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Rol, Permiso } from "./index.mjs";
class PermisoRol extends Model {
    static associate() {
        this.belongsTo(Rol, {
            foreignKey: 'id_rol'
        })
        this.belongsTo(Permiso, {
            foreignKey: 'id_permiso'
        })
    }
}
PermisoRol.init(
    {
        id_permiso_rol: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rol',
                key: 'id_rol'
            }
        },
        id_permiso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'permiso',
                key: 'id_permiso'
            }
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'permiso_rol',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "permiso_rol2_fk",
                fields: [
                    { name: "id_permiso" },
                ]
            },
            {
                name: "permiso_rol_fk",
                fields: [
                    { name: "id_rol" },
                ]
            },
            {
                name: "permiso_rol_pk",
                unique: true,
                fields: [
                    { name: "id_permiso_rol" },
                ]
            },
            {
                name: "pk_permiso_rol",
                unique: true,
                fields: [
                    { name: "id_permiso_rol" },
                ]
            },
        ]
    }
);
export default PermisoRol;
