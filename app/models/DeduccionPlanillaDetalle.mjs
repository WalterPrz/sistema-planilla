import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { CondicionDeduccion } from "./index.mjs";
class DeduccionPlanillaDetalle extends Model {
    static associate() {
        this.belongsTo(CondicionDeduccion, {
            foreignKey: "id_condicion_descuento",
        });
    }
}
DeduccionPlanillaDetalle.init({
    id_descuentos_planilla_detalle: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_planilla_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_condicion_descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monto_descuento: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: DB.connection(),
    tableName: "descuentos_planilla_detalle",
    schema: "public",
    timestamps: false,
});
export default DeduccionPlanillaDetalle;