import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {TipoDependencia, CentroCosto, PuestoTrabajoDependencia} from "./index.mjs";
class Dependencia extends Model {
  static associate() {
    this.hasMany(CentroCosto,{
        foreignKey: 'id_dependencia'
    })
    this.belongsTo(TipoDependencia,{
        foreignKey: 'id_tipo_dependencia'
    })
    this.hasMany(Dependencia,{
        foreignKey: 'id_dependencia_padre'
    })
    this.belongsTo(Dependencia,{
        foreignKey: 'id_dependencia_padre'
    })
    this.hasMany(PuestoTrabajoDependencia,{
      foreignKey: 'id_dependencia'
    })
  }
}
Dependencia.init(
  {
    id_dependencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_tipo_dependencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_dependencia",
        key: "id_tipo_dependencia",
      },
    },
    id_dependencia_padre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dependencia",
        key: "id_dependencia",
      },
    },
    nombre_dependencia: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: 'dependencia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dependencia_pk",
        unique: true,
        fields: [
          { name: "id_dependencia" },
        ]
      },
      {
        name: "es_de_tipo_dependencia_fk",
        fields: [
          { name: "id_tipo_dependencia" },
        ]
      },
      {
        name: "es_padre_de_fk",
        fields: [
          { name: "id_dependencia_padre" },
        ]
      },
      {
        name: "pk_dependencia",
        unique: true,
        fields: [
          { name: "id_dependencia" },
        ]
      },
    ]
  }
);
export default Dependencia;
