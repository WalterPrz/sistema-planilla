import { Sequelize } from "sequelize";
import dbConfig from '../../configs/ConectionDB.mjs'

export default class DB {
    static connection(connection = null){
        const predefinida = dbConfig.default;
        let config = {};
        if (connection) config = dbConfig.connections[connection];
        else config = dbConfig.connections[predefinida];
        return new Sequelize(config.options.db_name, config.options.db_username, config.options.db_password, {
            host: config.options.db_host,
            port: config.options.db_port,
            dialect: config.motor,
            logging: false,
        });
    }
    static async testing() {
        try {
          await this.connection().authenticate();
          return true;
        } catch (e) {
            console.log(e)
          return false;
        }
      }
}