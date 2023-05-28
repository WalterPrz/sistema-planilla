import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import CondicionDeduccion from './Deduccion.mjs';
class TipoDeduccion extends Model {
    static associate() {
        this.hasMany(CondicionDeduccion,{
            foreignKey:'id_descuento2'
        })
    }
}
TipoDeduccion.init(
    {
        id_descuento2: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_descuento: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        porcentual: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'tipos_descuentos',
        schema: 'public',
        timestamps: false,
    }
);
export default TipoDeduccion;
