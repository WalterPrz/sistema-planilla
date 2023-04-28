import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Dependencia} from "./index.mjs";
class TipoDependencia extends Model {
  static associate() {
    this.hasMany(Dependencia,{
        foreignKey:'id_tipo_dependencia'
    })
  }
}
TipoDependencia.init(
  {
    id_tipo_dependencia: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nombre_tipo_dependencia: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
  },
  {
    sequelize: DB.connection(),
    tableName: 'tipo_dependencia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_dependencia",
        unique: true,
        fields: [
          { name: "id_tipo_dependencia" },
        ]
      },
      {
        name: "tipo_dependencia_pk",
        unique: true,
        fields: [
          { name: "id_tipo_dependencia" },
        ]
      },
    ]
  }
);
export default TipoDependencia;
