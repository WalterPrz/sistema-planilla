import { Model, DataTypes }  from 'sequelize';
import DB from '../DB/connection.mjs';
import {Departamento, Empleado} from './index.mjs'
class Municipio extends Model{
    static associate(){
      this.belongsTo(Departamento,{
        foreignKey:'id_departamento'
      }),
      this.hasMany(Empleado,{
        foreignKey: 'id_municipio'
      })
    }
  }
  Municipio.init(
  {
    id_municipio: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_departamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'departamento',
          key: 'id_departamento'
        }
      },
      nombre_municipio: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
  },
  {
      sequelize: DB.connection(),
      tableName: 'municipio',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "municipio_pk",
          unique: true,
          fields: [
            { name: "id_municipio" },
          ]
        },
        {
          name: "pertenece_departamento_fk",
          fields: [
            { name: "id_departamento" },
          ]
        },
        {
          name: "pk_municipio",
          unique: true,
          fields: [
            { name: "id_municipio" },
          ]
        },
      ]
    }
  );
  export default Municipio