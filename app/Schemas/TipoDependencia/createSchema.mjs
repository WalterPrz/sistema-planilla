import { TipoDependencia } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
const verifyUnique = async (value) => {
  const valueMin = value.toLowerCase();
  const exist = await TipoDependencia.findOne({
    where: Sequelize.literal(`lower(nombre_tipo_dependencia) = '${valueMin}'`),
  });
  if (exist) {
    throw new Error("El nombre ya existe.");
  } else {
    return true;
  }
};
const createTipoDependenciaSchema = {
  nombre_tipo_dependencia: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar un nombre.",
    },
    escape: true,
    custom: {
      errorMessage: "El nombre ya existe2",
      options: verifyUnique,
    },
  },
};
export default createTipoDependenciaSchema;
