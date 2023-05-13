import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PermisoRol } from "./index.mjs";
class Permiso extends Model {
    static associate() {
        this.hasMany(PermisoRol,{
            foreignKey:'id_permiso'
        })
    }
}
Permiso.init(
    {
        id_permiso: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_permiso: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'permiso',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "permiso_pk",
                unique: true,
                fields: [
                    { name: "id_permiso" },
                ]
            },
            {
                name: "pk_permiso",
                unique: true,
                fields: [
                    { name: "id_permiso" },
                ]
            },
        ]
    }
);
export default Permiso;
