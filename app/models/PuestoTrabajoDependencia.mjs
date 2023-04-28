import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { PuestoTrabajo, Dependencia, Empleado} from "./index.mjs";
class PuestoTrabajoDependencia extends Model {
  static associate() {
    this.belongsTo(PuestoTrabajo,{
      foreignKey:'id_puesto_trabajo'
    })
    this.belongsTo(Dependencia,{
      foreignKey:'id_dependencia'
    })
    this.hasMany(Empleado,{
      foreignKey: 'id_puesto_trabajo_dependencia'
    })
  }
}
PuestoTrabajoDependencia.init(
  {
    id_puesto_trabajo_dependencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_puesto_trabajo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "puesto_trabajo",
        key: "id_puesto_trabajo",
      },
    },
    id_dependencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dependencia",
        key: "id_dependencia",
      },
    },
    salario_minimo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    salario_maximo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    plazas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jefatura: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: "puesto_trabajo_dependencia",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "pertenece_puesto_trabajo_fk",
        fields: [{ name: "id_puesto_trabajo" }],
      },
      {
        name: "pk_puesto_trabajo_dependencia",
        unique: true,
        fields: [{ name: "id_puesto_trabajo_dependencia" }],
      },
      {
        name: "puesto_trabajo_dependencia_pk",
        unique: true,
        fields: [{ name: "id_puesto_trabajo_dependencia" }],
      },
      {
        name: "tiene_dependencia_fk",
        fields: [{ name: "id_dependencia" }],
      },
    ],
  }
);
export default PuestoTrabajoDependencia;
