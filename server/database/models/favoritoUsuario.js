'use strict';

module.exports = (sequelize, DataTypes) => {
  var FavoritosUsuarios = sequelize.define('FavoritosUsuarios', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    subRazaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    tableName: "FavoritosUsuarios"
  });

  FavoritosUsuarios.associate = models => {
    FavoritosUsuarios.belongsTo(models.Usuarios, { as: "Usuario", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
  }

  return FavoritosUsuarios;
}
