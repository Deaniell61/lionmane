'use strict'
const Router = require('restify-router').Router
const routerInstance = new Router()
const handlers = require('../handlers')

routerInstance.get('/', handlers.package.version)


module.exports = routerInstance
