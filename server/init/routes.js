'use strict'
const Router = require('restify-router').Router
const routerInstance = new Router()
const handlers = require('../handlers')

routerInstance.get('/', handlers.package.version)

/**
 * Auth
 */
routerInstance.post('/registro', handlers.usuarios.store)
routerInstance.post('/login', handlers.auth.login)
routerInstance.put('/recovery/:id', handlers.usuarios.recovery)
/**
 * Usuarios
 */
routerInstance.get('/usuarios', handlers.usuarios.all)
routerInstance.get('/usuarios/:id', handlers.usuarios.one)
routerInstance.del('/usuarios/:id', handlers.usuarios.delete)
/**
 * Usuarios
 */
routerInstance.get('/consultas', handlers.consultas.all)
routerInstance.get('/consultas/:id', handlers.consultas.one)
routerInstance.post('/consultas/imagenes', handlers.consultas.pictures)
/**
 * Usuarios
 */
routerInstance.get('/favoritos', handlers.favoritos.all)
routerInstance.get('/favoritos/:id', handlers.favoritos.one)
routerInstance.post('/favoritos', handlers.favoritos.store)
routerInstance.del('/favoritos/:id', handlers.favoritos.delete)

module.exports = routerInstance
