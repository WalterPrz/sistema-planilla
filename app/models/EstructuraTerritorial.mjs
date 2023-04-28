import { Model, DataTypes }  from 'sequelize';
import DB from '../DB/connection.mjs';
import {Departamento} from './index.mjs'
class EstructuraTerritorial extends Model{
 static associate(){
  this.hasMany(Departamento,{
    foreignKey:'id_estructura_territorial'
  })
 }
}
EstructuraTerritorial.init(
{
  id_territorio: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_territorio: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},
{
    sequelize: DB.connection(),
    tableName: 'estructura_territorial',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estructura_territorial_pk",
        unique: true,
        fields: [
          { name: "id_territorio" },
        ]
      },
      {
        name: "pk_estructura_territorial",
        unique: true,
        fields: [
          { name: "id_territorio" },
        ]
      },
    ]
  }
);
export default EstructuraTerritorial