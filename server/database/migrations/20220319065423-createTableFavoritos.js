'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'FavoritosUsuarios',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        subRazaId: Sequelize.STRING,
        estado: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        //foreign key usage
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
    return queryInterface.dropTable('FavoritosUsuarios');
  }
};
