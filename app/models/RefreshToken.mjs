import { Model, DataTypes } from "sequelize";
import DB from "../DB/connection.mjs";
import {Usuario} from "./index.mjs";
class RefreshToken extends Model {
  static associate() {
    this.belongsTo(Usuario,{
      foreignKey: 'id_usuario'
    })
  }
}
RefreshToken.init(
  {
    id_refresh_token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_usuario',
          key: 'id',
        },
      },
      valid: {
        type: DataTypes.DATE,
      },
  },
  {
    sequelize: DB.connection(),
    tableName: 'refresh_tokens',
    schema: 'public',
    timestamps: false,
  }
);
export default RefreshToken;
