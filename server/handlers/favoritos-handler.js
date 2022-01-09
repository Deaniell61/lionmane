'use strict'
const _errors = require('restify-errors')
const FavoritosUsuarios = require('../database/models').FavoritosUsuarios

const getOne = (request, response, next) => {
  FavoritosUsuarios.findAll({
    where: {
      usuarioId: request.params.id,
    }
  }).then(items => {
    response.send(items);
  })
    .catch(err => {
      response.send(new _errors.BadGatewayError(err))
    })
  next()
}
const storeObject = (request, response, next) => {
  if (!request.body.raza || request.body.raza == '') {
    response.send(new _errors.NotFoundError('Record not Found'))
    return Promise.reject({ name: 'NoRecord', message: 'No Record Exist' })
  }
  FavoritosUsuarios.create({
    subRazaId: request.body.raza,
    estado: true,
    usuarioId: request.body.id,
    createdAt: new Date()
  }).then(async item => {
    response.send(item);
  }).catch(err => {
    response.send(new _errors.BadGatewayError(err));
  })
  next()
}

const deleteObject = (request, response, next) => {
  let _item = null
  FavoritosUsuarios.findById(request.params.id)
    .then(item => {
      if (item) {
        _item = item
        return FavoritosUsuarios.destroy({
          where: { id: item.id }
        })
      } else {
        return Promise.reject({ name: 'notFound', message: 'Record not Found' })
      }
    })
    .then(deleted => {
      response.send(_item)
    })
    .catch(err => {
      if (err.name === 'notFound') {
        response.send(new _errors.NotFoundError(err.message))
      } else {
        response.send(new _errors.BadGatewayError(err))
      }
    })
  next()
}

module.exports = {
  one: getOne,
  store: storeObject,
  delete: deleteObject
}
