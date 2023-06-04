const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('planilla', {
    id_planilla: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mes_planilla: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    anio_planilla: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    fecha_elabracion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    procesada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'planilla',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_planilla",
        unique: true,
        fields: [
          { name: "id_planilla" },
        ]
      },
      {
        name: "planilla_pk",
        unique: true,
        fields: [
          { name: "id_planilla" },
        ]
      },
    ]
  });
};
