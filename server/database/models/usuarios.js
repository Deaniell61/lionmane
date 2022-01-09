'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usuarios = sequelize.define('Usuarios', {
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
      allowNull: false,
      autoIncrement: true
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
    },
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    tableName: "Usuarios"
  });

  Usuarios.associate = models => {
    // One to Many relations
    Usuarios.hasMany(models.FavoritosUsuarios, { as: "Favoritos", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
    Usuarios.hasMany(models.ConsultasUsuarios, { as: "Consultas", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
  }
  return Usuarios;
};
