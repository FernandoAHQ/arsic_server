const Server = require("./models/server");
require('dotenv').config();

console.log(process.env)
const server = new Server();

server.execute();



