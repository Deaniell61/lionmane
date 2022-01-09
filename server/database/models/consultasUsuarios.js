'use strict';

module.exports = (sequelize, DataTypes) => {
  let ConsultasUsuarios = sequelize.define("ConsultasUsuarios", {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    raza: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: "ConsultasUsuarios"
  });

  ConsultasUsuarios.associate = models => {
    ConsultasUsuarios.belongsTo(models.Usuarios, { as: "Usuario", foreignKey: { name: "usuarioId", field: "usuarioId", allowNull: true } });
  };

  return ConsultasUsuarios;
}
