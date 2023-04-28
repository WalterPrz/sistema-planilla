import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {} from "./index.mjs";
class Empresa extends Model {
  static associate() {}
}
Empresa.init(
  {
    id_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_empresa: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    representante_legal: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
    pagina_web: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    direccion_empresa: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    nit: {
      type: DataTypes.CHAR(17),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "empresa",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "empresa_pk",
        unique: true,
        fields: [{ name: "id_empresa" }],
      },
      {
        name: "pk_empresa",
        unique: true,
        fields: [{ name: "id_empresa" }],
      },
    ],
  }
);
export default Empresa;
