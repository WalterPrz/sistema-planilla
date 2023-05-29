import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Documento } from "./index.mjs";
class TipoDocumento extends Model {
  static associate() {
    this.hasMany(Documento,{
      foreignKey: 'id_tipo_documento'
    })
  }
}
TipoDocumento.init(
  {
    id_tipo_documento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_tipo_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "tipo_documento",
    schema: "public",
    timestamps: false,
  }
);
export default TipoDocumento;
