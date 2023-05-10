import { PuestoTrabajo } from "../../../app/models/index.mjs";
import Sequelize, { Op, where } from "sequelize";
const verifyUnique = async (value, { req }) => {
  const valueMin = value.toLowerCase();
  const exist = await PuestoTrabajo.findOne({
    where: {
      [Op.and]: [
        Sequelize.literal(`lower(nombre_puesto_trabajo) = '${valueMin}'`),
        { id_puesto_trabajo: { [Op.ne]: req.params.id_puesto_trabajo } },
      ],
    },
  });
  if (exist) {
    throw new Error("El nombre ya existe");
  } else {
    return true;
  }
};
const updatePuestoTrabajoSchema = {
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
export default updatePuestoTrabajoSchema;
