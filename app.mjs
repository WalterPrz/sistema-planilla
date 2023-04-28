import './configs/Env.mjs'
import Server from './configs/Server.mjs'
import DB from './app/DB/connection.mjs';

const server = Server;
server.start();
server.routes();
server.exceptionConfig();
