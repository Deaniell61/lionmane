'use strict'
const _errors = require('restify-errors')
const _bcrypt = require('bcryptjs')
const _saltRounds = 10
const Usuarios = require('../database/models').Usuarios
const models = require('../database/models');
const auth = require('./auth-handler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../../config');

const getAll = (request, response, next) => {
  Usuarios.findAll().then(items => {
    response.send(items);
  })
    .catch(err => {
      response.send(new _errors.BadGatewayError(err))
    })
}

const getOne = (request, response, next) => {
  Usuarios.findOne({
    where: {
      id: request.params.id,
    },
    include: [
      {
        model: models.FavoritosUsuarios,
        as: 'Favoritos',
        where: {
          estado: true
        },
        required: false
      }
    ]
  }).then(item => {
    if (item)
      response.send(item)
    else
      response.send(new _errors.NotFoundError('Record not Found'))
  })
    .catch(err => {
      response.send(new _errors.BadGatewayError(err))
    })
}

const storeObject = (request, response, next) => {
  Usuarios.find({ where: { email: request.body.email } })
    .then(findItem => {
      if (findItem) {
        return Promise.reject({ name: 'existRecord', message: 'Record Exist' })
      } else {
        const salt = _bcrypt.genSaltSync(_saltRounds)
        const hash = _bcrypt.hashSync(request.body.hash, salt)
        const token = auth.generateToken(request.body)

        Usuarios.create({
          username: request.body.email.split('@')[0],
          hash: hash,
          salt: salt,
          email: request.body.email,
          apellido: request.body.apellido,
          nombre: request.body.nombre,
          createdAt: new Date(),
          estado: true,
        }).then(async item => {
          const _item = {
            ...item.toJSON(),
            token: token
          }
          const templateData = {
            "username": item.email + " " + item.username
          };
          // await emailPackage.sendTemplateEmail(item.email, config.get('/emails/welcome'), templateData);
          // await sendEm(item.email,item.primerNombre+' '+item.primerApellido, "Congratulations, you are a buyer in LionMane, Your password is: "+request.body.hash+" these credentials will help you enter the platform to start doing business.","Welcome to LionMane");
          response.send(_item);
        }).catch(err => {
          response.send(new _errors.BadGatewayError(err));
        })
      }
    })
    .catch(err => {
      if (err.name === 'existRecord') {
        response.send(new _errors.ConflictError(err.message))
      } else {
        response.send(new _errors.BadGatewayError(err))
      }
    })
}

const updateObject = (request, response, next) => {

  Usuarios.update({
    username: request.body.username,
    email: request.body.email,
    primerNombre: request.body.primerNombre,
    segundoNombre: request.body.segundoNombre,
    primerApellido: request.body.primerApellido,
    segundoApellido: request.body.segundoApellido,
    descripcion: request.body.descripcion,
    dpi: request.body.dpi,
    nit: request.body.nit,
    patenteComercio: request.body.patenteComercio,
    avatar: request.body.avatar,
    verificacion: request.body.verificacion,
    facebook: request.body.facebook,
    linkedin: request.body.linkedin,
    birthday: request.body.birthday,
    genre: request.body.genre,
    twitter: request.body.twitter,
    google: request.body.google,
    estado: request.body.estado,
    telefono: request.body.telefono,
    MembresiaId: request.body.MembresiaId,
    PaisId: request.body.PaisId,
    tipoUsuarioId: request.body.tipoUsuarioId,
    bisCardId: request.body.bisCardId
  }, { where: { id: request.params.id } })
    .then(_id => {
      return Usuarios.findById(request.params.id)
    })
    .then(item => {
      if (!request.body.bisCardId) {
        BisCard.update({
          fechaVencimiento: null,
          bisCardActiva: false,
          estado: true
        }, { where: { id: request.body.bisCardId2 } })
      }
      if (item)
        response.send(item)
      else
        return Promise.reject({ name: 'notFound', message: 'Record not Found' })
    })
    .catch(err => {
      if (err.name === 'notFound') {
        response.send(new _errors.NotFoundError(err.message))
      } else {
        response.send(new _errors.BadGatewayError(err))
      }
    })
}

const changePassword = (request, response, next) => {
  const salt = _bcrypt.genSaltSync(_saltRounds)
  const hash = _bcrypt.hashSync(request.body.hash, salt)

  Usuarios.update({
    hash: hash,
    salt: salt,
    google: request.body.type == "recovery" ? 21 : null,
  }, {
    where: {
      [Op.or]: [
        {
          id: request.params.id
        },
        {
          email: request.body.username
        },
        {
          username: request.body.username
        }
      ]
    }
  }).then(_id => {
    return Usuarios.findOne({
      where: {
        [Op.or]: [
          {
            id: request.params.id
          },
          {
            email: request.body.username
          },
          {
            username: request.body.username
          }
        ]
      }
    })
  }).then(async item => {
    if (item) {
      if (request.body.type) {
        switch (request.body.type) {
          case "recovery": {
            const templateData = {
              "username": item.primerNombre + " " + item.primerApellido,
              "temporaryPassword": request.body.hash
            };
            //await emailPackage.sendTemplateEmail(item.email, config.get('/emails/recovery'), templateData);
            break;
          }
        }
      }
      response.send(item)
    } else {
      return Promise.reject({ name: 'notFound', message: 'Record not Found' })
    }
  })
    .catch(err => {
      if (err.name === 'notFound') {
        response.send(new _errors.NotFoundError(err.message))
      } else {
        response.send(new _errors.BadGatewayError(err))
      }
    })
}

const deleteObject = (request, response, next) => {
  let _item = null
  Usuarios.findById(request.params.id)
    .then(item => {
      if (item) {
        _item = item
        return Usuarios.destroy({
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
}

module.exports = {
  all: getAll,
  one: getOne,
  store: storeObject,
  update: updateObject,
  delete: deleteObject,
  recovery: changePassword,
}
