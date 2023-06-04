import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PlanillaEmpleado } from "./index.mjs";
class Planilla extends Model {
  static associate() {
    this.hasMany(PlanillaEmpleado, {
      foreignKey: "id_planilla",
    });
  }
}
Planilla.init(
  {
    id_planilla: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mes_planilla: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    anio_planilla: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    fecha_elabracion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    procesada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "planilla",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default Planilla;
