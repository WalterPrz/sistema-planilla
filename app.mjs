import './configs/Env.mjs'
import Server from './configs/Server.mjs'
import DB from './app/DB/connection.mjs';
DB.testing()
const server = Server;
server.start();