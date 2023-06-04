import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { BonosPlanillaEmpleado } from "./index.mjs";
class TipoBono extends Model {
  static associate() {
    this.hasMany(BonosPlanillaEmpleado, {
      foreignKey: "id_tipo_bono",
    });
  }
}
TipoBono.init(
  {
    id_tipo_bono: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    valor: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "tipo_bono",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default TipoBono;
