import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Dependencia} from "./index.mjs";
class CentroCosto extends Model {
  static associate() {
    this.belongsTo(Dependencia,{
        foreignKey: 'id_dependencia',
    })
  }
}
CentroCosto.init(
  {
    id_partida_contable: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_dependencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dependencia",
        key: "id_dependencia",
      },
    },
    monto_anual: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    anio_centro_costo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "centro_costo",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "centro_costo_pk",
        unique: true,
        fields: [{ name: "id_partida_contable" }],
      },
      {
        name: "pk_centro_costo",
        unique: true,
        fields: [{ name: "id_partida_contable" }],
      },
      {
        name: "tiene_centro_costo_fk",
        fields: [{ name: "id_dependencia" }],
      },
    ],
  }
);
export default CentroCosto;
