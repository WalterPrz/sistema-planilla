const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_deduccion', {
    id_deduccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_descuento: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    porcentual: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    es_ley: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_deduccion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipos_descuentos",
        unique: true,
        fields: [
          { name: "id_deduccion" },
        ]
      },
      {
        name: "tipos_descuentos_pk",
        unique: true,
        fields: [
          { name: "id_deduccion" },
        ]
      },
    ]
  });
};
