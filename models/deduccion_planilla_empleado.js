const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deduccion_planilla_empleado', {
    id_deduccion_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_planilla_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'planilla_empleado',
        key: 'id_planilla_empleado'
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
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'deduccion_planilla_empleado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "descuentos_planilla_detalle_pk",
        unique: true,
        fields: [
          { name: "id_deduccion_planilla_empleado" },
        ]
      },
      {
        name: "pertenece_planilla_emps_fk",
        fields: [
          { name: "id_planilla_empleado" },
        ]
      },
      {
        name: "pk_descuentos_planilla_detalle",
        unique: true,
        fields: [
          { name: "id_deduccion_planilla_empleado" },
        ]
      },
      {
        name: "tiene_tipo_descuentos_fk",
        fields: [
          { name: "id_tipo_deduccion" },
        ]
      },
    ]
  });
};
