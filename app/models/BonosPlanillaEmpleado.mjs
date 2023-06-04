import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PlanillaEmpleado, TipoBono } from "./index.mjs";
class BonosPlanillaEmpleado extends Model {
  static associate() {
    this.belongsTo(TipoBono, {
      foreignKey: "id_tipo_bono",
    });
    this.belongsTo(PlanillaEmpleado, {
      foreignKey: "id_planilla_empleado",
    });
  }
}
BonosPlanillaEmpleado.init({
    id_bonos_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    monto: {
      type: DataTypes.DECIMAL,
      indexes: [],
    },
    id_planilla_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "planilla_empleado",
        key: "id_planilla_empleado",
      },
    },
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_tipo_bono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_bono",
        key: "id_tipo_bono",
      },
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "bonos_planilla_empleado",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default BonosPlanillaEmpleado;
