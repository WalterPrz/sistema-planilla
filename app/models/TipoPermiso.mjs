import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Permiso, Rol } from "./index.mjs";
class TipoPermiso extends Model {
    static associate() {
        this.hasMany(Permiso, {
            foreignKey: 'id_tipo_permiso'
        })
    }
}
TipoPermiso.init(
    {
        id_tipo_permiso: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'tipo_permiso',
        schema: 'public',
        timestamps: false,
    }
);
export default TipoPermiso;
