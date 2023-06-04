const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('condiciones_deduccion', {
    id_condicion_descuento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo_deduccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_deduccion',
        key: 'id_deduccion'
      }
    },
    nombre_condicion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    desde: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    hasta: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    porcentaje: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sobre_exceso: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    mas_cuota_fija: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'condiciones_deduccion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "condiciones_descuentos_pk",
        unique: true,
        fields: [
          { name: "id_condicion_descuento" },
        ]
      },
      {
        name: "contiene_tipo_descuento_fk",
        fields: [
          { name: "id_tipo_deduccion" },
        ]
      },
      {
        name: "pk_condiciones_descuentos",
        unique: true,
        fields: [
          { name: "id_condicion_descuento" },
        ]
      },
    ]
  });
};
