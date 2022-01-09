'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usuarios = sequelize.define('Usuarios', {
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    tableName: "Usuarios"
  });

  Usuarios.associate = models => {
    // One to Many relations
    Usuarios.hasMany(models.FavoritosUsuarios, { as: "FavoritosUsuarios", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
    Usuarios.hasMany(models.ConsultasUsuarios, { as: "ConsultasUsuarios", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
  }
  return Usuarios;
};
