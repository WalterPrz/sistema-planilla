import { Permiso, TipoRol } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const verifyUnique = async (value, {req}) => {
    const exist = await Rol.findOne({
        where: {
            nombre_rol: value,
        }
    });
    if (exist) {
        throw new Error("El nombre ya existe");
    } else {
        return true;
    }
};
const verifyArrayExist = async (value) => {
    const son_numeros = value.every((num) => Number.isInteger(num) && num >= 0);
    if (!son_numeros) {
        throw new Error("El array de permisos tiene valores incorrectos.")
    }
    const todos = await Permiso.findAll({
        where: {
            id_permiso: {
                [Op.in]: value,
            },
        },
    })
    const existingIds = todos.map((item) => item.id_permiso);
    const missingIds = value.filter((id) => !existingIds.includes(id));
    if (missingIds.length != 0) {
        throw new Error("El array de permisos tiene valores que no existen.")
    }   
}
const createRolSchema = {
    id_tipo_rol: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el tipo rol",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo rol",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_tipo_rol', TipoRol)
        },
    },
    descripcion_rol: {
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage: "Máximo 100 caracteres",
        }
    },
    nombre_rol: {
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        escape: true,
        custom: {
            options: verifyUnique,
        },
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: "Máximo 50 caracteres",
        }
    },
    array_permisos: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el tipo rol",
        },
        isArray: {
            bail: true,
            options: {
                min: 1,
                max: 300,
            },
            errorMessage: "Debes ingresar almenos 1 permiso.",
        },
        customSanitizer: {
            options: (value)=>[...new Set(value)],
        },
        custom: {
            bail: true,
            options: verifyArrayExist
        },
    },
};
export default createRolSchema;
