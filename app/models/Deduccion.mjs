import { Model, DataTypes } from "sequelize";
import TipoDeduccion from "./TipoDeduccion.mjs";
import DB from "../DB/connection.mjs";
class CondicionDeduccion extends Model {
    static associate() {
        this.belongsTo(TipoDeduccion,{
            foreignKey:'id_descuento2'
        })
    }
}
CondicionDeduccion.init(
    {
        id_condicion_descuento: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_condicion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        desde: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        hasta: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        porcentaje: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        sobre_exceso: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        mas_cuota_fija: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
    {
        sequelize: DB.connection(),
        tableName: 'condiciones_descuentos',
        schema: 'public',
        timestamps: false,
    }
);
export default CondicionDeduccion;
