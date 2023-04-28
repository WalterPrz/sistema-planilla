import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PuestoTrabajoDependencia } from "./index.mjs";
class PuestoTrabajo extends Model {
  static associate() {
    this.hasMany(PuestoTrabajoDependencia,{
      foreignKey: 'id_puesto_trabajo'
    })
  }
}
PuestoTrabajo.init(
  {
    id_puesto_trabajo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_puesto_trabajo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "puesto_trabajo",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "pk_puesto_trabajo",
        unique: true,
        fields: [{ name: "id_puesto_trabajo" }],
      },
      {
        name: "puesto_trabajo_pk",
        unique: true,
        fields: [{ name: "id_puesto_trabajo" }],
      },
    ],
  }
);
export default PuestoTrabajo;
