import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
class PlanillaEmpleado extends Model {
    static associate() {}
}
PlanillaEmpleado.init({
    id_planilla_empleado: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_planilla: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_neto: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    sequelize: DB.connection(),
    tableName: 'planilla_empleado',
    schema: 'public',
    timestamps: false
});
export default PlanillaEmpleado;