import { PuestoTrabajo } from "../../../app/models/index.mjs";
import Sequelize, { Op, where } from "sequelize";
const verifyUnique = async (value) => {
  const valueMin = value.toLowerCase();
  const exist = await PuestoTrabajo.findOne({
    where: Sequelize.literal(`lower(nombre_puesto_trabajo) = '${valueMin}'`),
  });
  if (exist) {
    throw new Error("El nombre ya existe");
  } else {
    return true;
  }
};
const createPuestoTrabajoSchema = {
  nombre_puesto_trabajo: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar un nombre.",
    },
    escape: true,
    custom: {
      errorMessage: "El nombre ya existe",
      options: verifyUnique,
    },
  },
};
export default createPuestoTrabajoSchema;
