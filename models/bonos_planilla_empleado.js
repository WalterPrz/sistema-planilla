const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonos_planilla_empleado', {
    id_bonos_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_planilla_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'planilla_empleado',
        key: 'id_planilla_empleado'
      }
    },
    descripcion_concepto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_tipo_bono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_bono',
        key: 'id_tipo_bono'
      }
    }
  }, {
    sequelize,
    tableName: 'bonos_planilla_empleado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ingresos_planilla_detalle_pk",
        unique: true,
        fields: [
          { name: "id_bonos_planilla_empleado" },
        ]
      },
      {
        name: "pertenece_planilla_empleados_fk",
        fields: [
          { name: "id_bonos_planilla_empleado" },
        ]
      },
      {
        name: "pk_ingresos_planilla_detalle",
        unique: true,
        fields: [
          { name: "id_bonos_planilla_empleado" },
        ]
      },
    ]
  });
};
