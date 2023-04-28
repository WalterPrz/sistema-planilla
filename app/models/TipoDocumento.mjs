import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { DocumentoEmpleado } from "./index.mjs";
class TipoDocumento extends Model {
  static associate() {
    this.hasMany(DocumentoEmpleado,{
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
    indexes: [
      {
        name: "pk_tipo_documento",
        unique: true,
        fields: [{ name: "id_tipo_documento" }],
      },
      {
        name: "tipo_documento_pk",
        unique: true,
        fields: [{ name: "id_tipo_documento" }],
      },
    ],
  }
);
export default TipoDocumento;
