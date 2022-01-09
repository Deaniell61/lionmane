'use strict';
const _bcrypt = require('bcryptjs')
const _saltRounds = 10

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = _bcrypt.genSaltSync(_saltRounds)
    const hash = _bcrypt.hashSync('admin', salt)

    return queryInterface.bulkInsert('Usuarios', [{
      username: 'admin',
      hash: hash,
      email: 'dannyjose1112@hotmail.com',
      nombre: 'Daniel',
      apellido: 'Rodriguez',
      estado: true,
      id: 1,
      salt: salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
