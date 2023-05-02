import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Empleado, RefreshToken } from "./index.mjs";
class Usuario extends Model {
  static associate() {
    this.belongsTo(Empleado,{
        foreignKey: 'id_empleado'
    })
    this.hasMany(RefreshToken,{
      foreignKey: 'id_usuario'
    })
  }
}
Usuario.init(
  {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "rol",
        key: "id_rol1",
      },
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "empleado",
        key: "id_empleado",
      },
    },
    correo_institucional: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ultima_conexion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    token_valid_after: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: DB.connection(),
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_usuario",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "tiene_empleado2_fk",
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "tiene_usuario2_fk",
        fields: [
          { name: "id_rol" },
        ]
      },
      {
        name: "usuario_pk",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  }
);
export default Usuario;
