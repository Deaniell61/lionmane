'use strict';
const _bcrypt = require('bcryptjs')
const _saltRounds = 10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Usuarios',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        hash: Sequelize.STRING,
        salt: Sequelize.STRING,
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nombre: Sequelize.STRING,
        apellido: Sequelize.STRING,
        email: Sequelize.STRING,
        estado: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        }
      },
      {
        engine: 'InnoDB',     // default: 'InnoDB'
        collate: 'latin1_danish_ci', // collation, MYSQL only
        initialAutoIncrement: 1
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Usuarios');
  }
};
