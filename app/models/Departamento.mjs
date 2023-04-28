import { Model, DataTypes }  from 'sequelize';
import DB from '../DB/connection.mjs';
import {EstructuraTerritorial, Municipio} from './index.mjs'
class Departamento extends Model{
  static associate(){
    this.belongsTo(EstructuraTerritorial,{
      foreignKey:'id_estructura_territorial'
    })
    this.hasMany(Municipio,{
      foreignKey:'id_departamento'
    })
  }
}
Departamento.init(
{
  id_departamento: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_territorio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estructura_territorial',
      key: 'id_territorio'
    }
  },
  nombre_departamento: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},
{
    sequelize: DB.connection(),
    tableName: 'departamento',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "departamento_pk",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
      {
        name: "pertenece_est_territorial_fk",
        fields: [
          { name: "id_territorio" },
        ]
      },
      {
        name: "pk_departamento",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  }
);
export default Departamento