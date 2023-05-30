import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import { Usuario, Genero, Profesion, EstadoCivil,Municipio, PuestoTrabajoDependencia, DocumentoEmpleado } from "./index.mjs";
class Empleado extends Model {
  static associate() {
    this.belongsTo(Genero,{
        foreignKey: 'id_genero'
    })
    this.belongsTo(Profesion,{
        foreignKey: 'id_profesion'
    })
    this.belongsTo(EstadoCivil,{
        foreignKey: 'id_estado_civil'
    })
    this.belongsTo(Municipio,{
        foreignKey: 'id_municipio'
    })
    this.belongsTo(PuestoTrabajoDependencia,{
        foreignKey: 'id_puesto_trabajo_dependencia'
    })
    this.hasMany(DocumentoEmpleado,{
        foreignKey: 'id_empleado'
    })
    this.hasMany(Usuario,{
      foreignKey: 'id_empleado'
    })
    this.hasMany(Empleado,{
      foreignKey:'id_empleado_jefe'
    })
    this.belongsTo(Empleado,{
      foreignKey: 'id_empleado_jefe'
    })
  }
}
Empleado.init(
  {
    id_empleado: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'genero',
          key: 'id_genero'
        }
      },
      id_profesion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'profesion',
          key: 'id_profesion'
        }
      },
      id_estado_civil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'estado_civil',
          key: 'id_estado_civil'
        }
      },
      id_municipio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'municipio',
          key: 'id_municipio'
        }
      },
      id_puesto_trabajo_dependencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'puesto_trabajo_dependencia',
          key: 'id_puesto_trabajo_dependencia'
        }
      },
      primer_nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      segundo_nombre: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      primer_apellido: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      segundo_apellido: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      apellido_casada: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      fecha_de_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      numero_casa_apto: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      salario: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      id_empleado_jefe: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      barrio_colonia_residencial : {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      pasaje_senda : {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      calle_avenida : {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fecha_inicio:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      fecha_fin:{
        type: DataTypes.DATEONLY,
        allowNull: true
      }
  },
  {
    sequelize: DB.connection(),
    tableName: 'empleado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ejerce_pu_trabajo_dep_fk",
        fields: [
          { name: "id_puesto_trabajo_dependencia" },
        ]
      },
      {
        name: "empleado_pk",
        unique: true,
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "es_de_genero_fk",
        fields: [
          { name: "id_genero" },
        ]
      },
      {
        name: "esta_estado_civil_fk",
        fields: [
          { name: "id_estado_civil" },
        ]
      },
      {
        name: "pertenece_municipio_fk",
        fields: [
          { name: "id_municipio" },
        ]
      },
      {
        name: "pk_empleado",
        unique: true,
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "realzia_una_profesion_fk",
        fields: [
          { name: "id_profesion" },
        ]
      },
    ]
  }
);
export default Empleado;
