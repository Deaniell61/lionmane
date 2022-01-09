'use strict'
const _errors = require('restify-errors')
const ConsultasUsuarios = require('../database/models').ConsultasUsuarios
const reques = require('request');

const getAll = (request, response, next) => {
  reques('https://dog.ceo/api/breeds/list/all', { json: true }, (err, res, body) => {
    if (err) { response.send(new _errors.BadGatewayError(err)) }
    response.send(body);
  });
  next()
}

const getOne = (request, response, next) => {
  if (!request.params.raza || request.params.raza == '') {
    response.send(new _errors.NotFoundError('Record not Found'))
  }
  reques(`https://dog.ceo/api/breed/${request.params.raza}/list`, { json: true }, (err, res, body) => {
    if (err) { response.send(new _errors.BadGatewayError(err)) }
    if (body.lenght <= 0) {
      return Promise.reject({ name: 'NoRecord', message: 'No Record Exist' })
    }
    ConsultasUsuarios.create({
      raza: request.params.raza,
      estado: true,
      usuarioId: request.params.id,
      createdAt: new Date()
    }).then(async item => {
      const _item = {
        ...item.toJSON(),
        consultas: [body]
      };
      response.send(_item);
    }).catch(err => {
      response.send(new _errors.BadGatewayError(err));
    })
  });
  next()
}

const getPictures = (request, response, next) => {
  if(!request.body.raza || !request.body.subraza){
    return Promise.reject({ name: 'NoRecord', message: 'Params Error' })
  }
  reques(`https://dog.ceo/api/breed/${request.body.raza}/${request.body.subraza}/images`, { json: true }, (err, res, body) => {
    if (err) { response.send(new _errors.BadGatewayError(err)) }
    response.send(body);
  });
  next()
}

module.exports = {
  all: getAll,
  one: getOne,
  pictures: getPictures,
};
