const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_bono', {
    id_tipo_bono: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    porcentual: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    valor: {
      type: DataTypes.REAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_bono',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_bono_pk",
        unique: true,
        fields: [
          { name: "id_tipo_bono" },
        ]
      },
    ]
  });
};
