import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { TipoDeduccion } from "./index.mjs";
class CondicionesDeduccion extends Model {
  static associate() {
    this.belongsTo(TipoDeduccion, {
      foreignKey: "id_tipo_deduccion",
    });
  }
}
CondicionesDeduccion.init(
  {
    id_condicion_descuento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_tipo_deduccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_deduccion",
        key: "id_deduccion",
      },
    },
    nombre_condicion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    desde: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    hasta: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sobre_exceso: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    mas_cuota_fija: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "condiciones_deduccion",
    schema: "public",
    timestamps: false,
    indexes: [],
  }
);
export default CondicionesDeduccion;
