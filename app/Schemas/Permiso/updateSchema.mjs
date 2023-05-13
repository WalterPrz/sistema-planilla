import { Permiso } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const verifyUnique = async (value, {req}) => {
    const exist = await Permiso.findOne({
        where: {
            nombre_permiso:value,
            id_permiso:{[Op.ne]: req.params.id_permiso}
        }
    });
    if (exist) {
        throw new Error("El nombre ya existe");
    } else {
        return true;
    }
};
const toUppeerAndDeleteSpaces = (value) => value.toUpperCase().replace(/\s/g, '')
const updatePermisoSchema = {
    id_permiso: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el de permiso",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_permiso', Permiso)
        },
    },
    nombre_permiso: {
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        customSanitizer: {
            options: toUppeerAndDeleteSpaces,
        },
        escape: true,
        custom: {
            options: verifyUnique,
        },
    },
};
export default updatePermisoSchema;
