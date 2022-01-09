'use strict'
const config = require('../config')
const Promise = require('bluebird')
const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const Sequelize = require('sequelize')
const jwt = require('restify-jwt-community')
const models = require('./database/models');

/**
* Config the Connectino Sequelize
*/
const SQ = new Sequelize(
  config.get('/db/database'),
  config.get('/db/username'),
  config.get('/db/password'),
  {
    host: config.get('/db/host'),
    dialect: 'mysql',
    logging: false
  })

/**
* Config the Logger
*/
const Logger = require('bucker').createLogger({
  name: config.get('/app/name'),
  console: config.get('/logger/options/console')
})

/**
* Function to Start the Server
*/
const start = (host, port) => {

  //console.log(`${config.get('/db/database')}\n${config.get('/db/username')}\n${config.get('/db/password')}\n${config.get('/db/host')}`);

  return new Promise((resolve, reject) => {
    /**
     * Create the Server
     */
    const server = restify.createServer({
      name: config.get('/name'),
      version: config.get('/version')
    })

    /**
     * Set the Logger to Server
     */
    server.Logger = Logger

    /**
     * Enable CORS to Server
     */
    const cors = corsMiddleware({
      preflightMaxAge: 10, //Optional
      origins: ['*'],
      allowHeaders: ['Authorization']
    })

    /**
     * Middleware Restify
     */
    server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser({ mapParams: true }))
    server.use(restify.plugins.multipartBodyParser())
    server.use(restify.plugins.fullResponse())
    server.pre(cors.preflight)
    server.use(cors.actual)

    /**
     * Set JWT
     */
    let jwtConfig = {
      secret: config.get('/app/secret')
    }

    server.use(jwt(jwtConfig).unless({
      path: [
        '/',
        '/login',
        '/registro',
        /\/recovery\/.*/,
      ]
    }))

    /**
     * Adding Routes
     */
    const routes = require('./init/routes')
    routes.applyRoutes(server)

    /**
     * Connect to Database
     */
    SQ.authenticate().then(() => {
      Logger.log('Connecte to Database <3')
      models.sequelize.sync({});
      /**
       * Start the Server
       */
      server.listen(port, host, () => {
        Logger.log(`Server running at: ${server.url}`)
      })
    })
  })
}

module.exports = {
  start: start
}
