import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { TipoDocumento, Empleado} from "./index.mjs";
class DocumentoEmpleado extends Model {
  static associate() {
    this.belongsTo(TipoDocumento,{
      foreignKey: 'id_tipo_documento'
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
    id_tipo_documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_documento",
        key: "id_tipo_documento",
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
    indexes: [
      {
        name: "documento_empleado_pk",
        unique: true,
        fields: [{ name: "id_documento_empleado" }],
      },
      {
        name: "es_de_empleado_fk",
        fields: [{ name: "id_empleado" }],
      },
      {
        name: "es_de_tipo_documento_fk",
        fields: [{ name: "id_tipo_documento" }],
      },
      {
        name: "pk_documento_empleado",
        unique: true,
        fields: [{ name: "id_documento_empleado" }],
      },
    ],
  }
);
export default DocumentoEmpleado;
