import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PermisoRol, TipoPermiso } from "./index.mjs";
class Permiso extends Model {
    static associate() {
        this.hasMany(PermisoRol,{
            foreignKey:'id_permiso'
        })
    }
    static associate() {
        this.belongsTo(TipoPermiso,{
            foreignKey:'id_tipo_permiso'
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
        },
        id_tipo_permiso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipo_permiso',
                key: 'id_tipo_permiso'
            }
        },
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
