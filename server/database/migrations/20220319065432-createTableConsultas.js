'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'ConsultasUsuarios',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        raza: Sequelize.STRING,
        usuarioId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      {
        engine: 'InnoDB',    // default: 'InnoDB'
        collate: 'latin1_danish_ci', // collation, MYSQL only
        initialAutoIncrement: 1
      }
    )
    return queryInterface.changeColumn(
      'ConsultasUsuarios',
      'id',
      {
        allowNull: false,
        autoIncrement: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
