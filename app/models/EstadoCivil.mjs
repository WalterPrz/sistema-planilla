import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Empleado} from "./index.mjs";
class EstadoCivil extends Model {
  static associate() {
    this.hasMany(Empleado,{
      foreignKey: 'id_estado_civil'
    })
  }
}
EstadoCivil.init(
  {
    id_estado_civil: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_estado_civil: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: 'estado_civil',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estado_civil_pk",
        unique: true,
        fields: [
          { name: "id_estado_civil" },
        ]
      },
      {
        name: "pk_estado_civil",
        unique: true,
        fields: [
          { name: "id_estado_civil" },
        ]
      },
    ]
  }
);
export default EstadoCivil;
