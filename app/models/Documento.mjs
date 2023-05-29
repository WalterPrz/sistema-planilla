import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { DocumentoEmpleado, TipoDocumento } from "./index.mjs";
class Documento extends Model {
  static associate() {
    this.hasMany(DocumentoEmpleado,{
      foreignKey: 'id_documento'
    })
    this.belongsTo(TipoDocumento,{
        foreignKey:'id_tipo_documento'
    })
  }
}
Documento.init(
  {
    id_documento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  },
  {
    sequelize: DB.connection(),
    tableName: "documento",
    schema: "public",
    timestamps: false,
  }
);
export default Documento;
