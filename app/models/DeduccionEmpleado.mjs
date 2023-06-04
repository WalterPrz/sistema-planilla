import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Empleado, TipoDeduccion } from "./index.mjs";
class DeduccionEmpleado extends Model {
  static associate() {
    this.belongsTo(Empleado, {
      foreignKey: "id_empleado",
    });
    this.belongsTo(TipoDeduccion, {
      foreignKey: "id_tipo_deduccion",
    });
  }
}
DeduccionEmpleado.init(
  {
    id_deduccion_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleado",
        key: "id_empleado",
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
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "deduccion_empleado",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default DeduccionEmpleado;
