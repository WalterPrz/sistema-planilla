import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {
  BonosPlanillaEmpleado,
  DeduccionPlanillaEmpleado,
  Planilla,
  Empleado,
} from "./index.mjs";
class PlanillaEmpleado extends Model {
  static associate() {
    this.hasMany(BonosPlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
    });
    this.hasMany(DeduccionPlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
    });
    this.belongsTo(Empleado, {
      foreignKey: "id_empleado",
    });
    this.belongsTo(Planilla, {
      foreignKey: "id_planilla",
    });
  }
}
PlanillaEmpleado.init(
  {
    id_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_planilla: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    total_neto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },

  {
    sequelize: DB.connection(),
    tableName: "planilla_empleado",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default PlanillaEmpleado;
