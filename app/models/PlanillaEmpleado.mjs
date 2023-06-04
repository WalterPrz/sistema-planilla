import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {
  BonosPlanillaEmpleado,
  DeduccionPlanillaEmpleado,
  Empleado,
  Planilla,
} from "./index.mjs";
class PlanillaEmpleado extends Model {
  static associate() {
    this.belongsTo(Empleado, {
      foreignKey: "id_empleado",
    });
    this.belongsTo(Planilla, {
      foreignKey: "id_planilla",
    });
    this.hasMany(BonosPlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
    });
    this.hasMany(DeduccionPlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
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
      references: {
        model: "planilla",
        key: "id_planilla",
      },
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleado",
        key: "id_empleado",
      },
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
