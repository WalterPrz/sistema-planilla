import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Empleado} from "./index.mjs";
class Profesion extends Model {
  static associate() {
    this.hasMany(Empleado,{
      foreignKey: 'id_profesion'
    })
  }
}
Profesion.init(
  {
    id_profesion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_profesion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: 'profesion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_profesion",
        unique: true,
        fields: [
          { name: "id_profesion" },
        ]
      },
      {
        name: "profesion_pk",
        unique: true,
        fields: [
          { name: "id_profesion" },
        ]
      },
    ]
  }
);
export default Profesion;
