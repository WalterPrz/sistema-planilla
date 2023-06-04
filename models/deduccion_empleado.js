const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deduccion_empleado', {
    id_deduccion_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleado',
        key: 'id_empleado'
      }
    },
    id_tipo_deduccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_deduccion',
        key: 'id_deduccion'
      }
    },
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'deduccion_empleado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deduccion_empleado_pk",
        unique: true,
        fields: [
          { name: "id_deduccion_empleado" },
        ]
      },
    ]
  });
};
