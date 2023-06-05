import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PlanillaEmpleado, TipoDeduccion } from "./index.mjs";
class DeduccionPlanillaEmpleado extends Model {
  static associate() {
    this.belongsTo(PlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
    });
    this.belongsTo(TipoDeduccion, {
      foreignKey: "id_tipo_deduccion",
    });
  }
}
DeduccionPlanillaEmpleado.init(
  {
    id_deduccion_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_planilla_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "planilla_empleado",
        key: "id_planilla_empleado",
      },
    },
    id_tipo_deduccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_deduccion",
        key: "id_deduccion",
      },
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "deduccion_planilla_empleado",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default DeduccionPlanillaEmpleado;
