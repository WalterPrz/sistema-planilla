import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { DeduccionEmpleado, DeduccionPlanillaEmpleado } from "./index.mjs";
import CondicionesDeduccion from "./CondicionesDeduccion.mjs";
class TipoDeduccion extends Model {
  static associate() {
    this.hasMany(DeduccionPlanillaEmpleado, {
      foreignKey: "id_tipo_deduccion",
    });
    this.hasMany(CondicionesDeduccion, {
      foreignKey: "id_tipo_deduccion",
    });
    this.hasMany(DeduccionEmpleado, {
      foreignKey: "id_tipo_deduccion",
    });
  }
}
TipoDeduccion.init(
  {
    id_deduccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_descuento: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    porcentual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    es_ley: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "tipo_deduccion",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default TipoDeduccion;
