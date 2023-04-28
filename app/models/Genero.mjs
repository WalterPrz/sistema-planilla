import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Empleado} from "./index.mjs";
class Genero extends Model {
  static associate() {
    this.hasMany(Empleado,{
      foreignKey: 'id_genero'
    })
  }
}
Genero.init(
  {
    id_genero: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_genero: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: 'genero',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "genero_pk",
        unique: true,
        fields: [
          { name: "id_genero" },
        ]
      },
      {
        name: "pk_genero",
        unique: true,
        fields: [
          { name: "id_genero" },
        ]
      },
    ]
  }
);
export default Genero;
