'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Usuarios',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        usuario: Sequelize.STRING,
        nombre: Sequelize.STRING,
        apellido: Sequelize.STRING,
        email: Sequelize.INTEGER,
        estado: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        }
      },
      {
        engine: 'InnoDB',    // default: 'InnoDB'
        collate: 'latin1_danish_ci' // collation, MYSQL only
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
