'use strict';

module.exports = (sequelize, DataTypes) => {
  var FavoritosUsuarios = sequelize.define('FavoritosUsuarios', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subRazaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    }
  }, {
    freezeTableName: true,
    tableName: "FavoritosUsuarios"
  });

  return FavoritosUsuarios;
}
