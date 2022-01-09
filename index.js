'use strict'

// console.log(process.env.DB_USERNAME);
const config = require('./config');
const server = require('./server/server');
const host = config.get('/app/host');
const port = config.get('/app/port');

//START THE SERVER
module.exports = server.start(host, port);
