const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('planilla_empleado', {
    id_planilla_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_planilla: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'planilla',
        key: 'id_planilla'
      }
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleado',
        key: 'id_empleado'
      }
    },
    total_neto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'planilla_empleado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_planilla_empleado",
        unique: true,
        fields: [
          { name: "id_planilla_empleado" },
        ]
      },
      {
        name: "planilla_empleado_pk",
        unique: true,
        fields: [
          { name: "id_planilla_empleado" },
        ]
      },
      {
        name: "tiene_empleado1_fk",
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "tiene_planilla_fk",
        fields: [
          { name: "id_planilla" },
        ]
      },
    ]
  });
};
