import { Permiso } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
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
