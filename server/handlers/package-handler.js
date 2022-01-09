'use strict'
const config = require('../../config')

const version = (request, response, next) => {
  response.send({
    name: config.get('/name'),
    author: config.get('/author'),
    version: config.get('/version'),
    description: config.get('/description'),
    enviroment: config.get('/app/env'),
  })
  next()
}

module.exports = {
  version: version
}
