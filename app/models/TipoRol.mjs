import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Rol } from "./index.mjs";
class TipoRol extends Model {
    static associate() {
        this.hasMany(Rol, {
            foreignKey: 'id_tipo_rol'
        })
    }
}
TipoRol.init(
    {
        id_tipo_rol: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_tipo_rol: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'tipo_rol',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "pk_tipo_rol",
                unique: true,
                fields: [
                    { name: "id_tipo_rol" },
                ]
            },
            {
                name: "tipo_rol_pk",
                unique: true,
                fields: [
                    { name: "id_tipo_rol" },
                ]
            },
        ]
    }
);
export default TipoRol;
