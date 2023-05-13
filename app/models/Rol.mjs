import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { TipoRol, PermisoRol, Usuario } from "./index.mjs";
class Rol extends Model {
    static associate() {
        this.belongsTo(TipoRol, {
            foreignKey: 'id_tipo_rol'
        })
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
        id_tipo_rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipo_rol',
                key: 'id_tipo_rol'
            }
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
                name: "es_de_tipo_rol_fk",
                fields: [
                    { name: "id_tipo_rol" },
                ]
            },
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
