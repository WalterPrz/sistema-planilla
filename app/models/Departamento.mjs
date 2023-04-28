import { Model, DataTypes }  from 'sequelize';
import DB from '../DB/connection.mjs';
import {EstructuraTerritorial} from './index.mjs'
class Departamento extends Model{
  static associate(){
    this.belongsTo(EstructuraTerritorial,{
      foreignKey:'id_estructura_territorial'
    })
  }
}
Departamento.init(
{
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_estructura_territorial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'estructura_territorial',
        key: 'id'
        }
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
          { name: "id" },
        ]
      },
    ]
  }
);
export default Departamento