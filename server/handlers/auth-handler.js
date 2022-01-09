const config = require('../../config')
const _errors = require('restify-errors')
const _bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuarios = require('../database/models').Usuarios

const doLogin = (request, response, next) => {
  Usuarios.find({where: {email: request.body.email}})
  .then(admin =>{
    if(admin) {
      _bcrypt.compare(request.body.hash, admin.hash, (err, success) => {
        if(!success){
          response.send(new _errors.BadRequestError('Invalid Credentials'))
        } else if (success){
          const token = generateToken(admin)
          const _admin = {
            ...admin.toJSON(),
            token: token
          }
          delete _admin.hash
          response.send(_admin)
        }else{
          response.send(new _errors.BadGatewayError(err))
        }
      })
    } else {
      response.send(new _errors.NotFoundError('Record not Found'))
    }
  })
  .catch( err => {
    response.send(new _errors.BadGatewayError(err))
  })
  next()
}

const generateToken = (item) => {
  let jwt_user = {
    id: item.id,
    email: item.email,
    username: item.username,
  }
  const token = jwt.sign(jwt_user, config.get('/app/secret'), {expiresIn: '1d'})
  // console.log(token)
  return token
}

module.exports = {
  login: doLogin,
  generateToken: generateToken
}
