import { TipoDependencia } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
const verifyUnique = async (value, { req }) => {
  try{
    const valueMin = value.toLowerCase();
    const exist = await TipoDependencia.findOne({
      where: {
        [Op.and]: [
          Sequelize.literal(`lower(nombre_tipo_dependencia) = '${valueMin}'`),
          { id_tipo_dependencia: { [Op.ne]: req.params.id_tipo_dependencia } },
        ],
      },
    });
    if (exist) {
      throw new Error("El nombre ya existe");
    } else {
      return true;
    }
  }catch(e){
    console.log(e)
    throw new Error("Ocurrio un error")
  }
};
const updateTipoDependenciaSchema = {
  nombre_tipo_dependencia: {
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
export default updateTipoDependenciaSchema;
