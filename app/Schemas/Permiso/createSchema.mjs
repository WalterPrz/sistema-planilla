import { Permiso,TipoPermiso } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const verifyUnique = async (value) => {
    const exist = await Permiso.findOne({
        where: {
            nombre_permiso:value,
        }
    });

    if (exist) {
        //throw new Error("El nombre ya existe");
    } else {
        return true;
    }
};
const toUppeerAndDeleteSpaces = (value) => value.toUpperCase().replace(/\s/g, '')
const createPermisoSchema = {
    id_tipo_permiso: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el tipo permiso",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo permiso",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_tipo_permiso', TipoPermiso)
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
export default createPermisoSchema;
