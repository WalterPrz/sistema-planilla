import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Documento, Empleado} from "./index.mjs";
class DocumentoEmpleado extends Model {
  static associate() {
    this.belongsTo(Documento,{
      foreignKey: 'id_documento'
    })
    this.belongsTo(Empleado,{
      foreignKey: 'id_empleado'
    })
  }
}
DocumentoEmpleado.init(
  {
    id_documento_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "documento",
        key: "id_documento",
      },
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleado",
        key: "id_empleado",
      },
    },
    numero_documento_empleado: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "documento_empleado",
    schema: "public",
    timestamps: false,
  }
);
export default DocumentoEmpleado;
