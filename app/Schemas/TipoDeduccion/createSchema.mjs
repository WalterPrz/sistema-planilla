import { TipoDeduccion } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const validateValor = (value, { req }) => {
    try {
        if (!!value) {
            if (req.body.porcentual) {
                if (value > 100 || value < 0) {
                    throw new Error("El valor debe ser entre 0 y 100")
                } else {
                    return true
                }
            } else {
                if (value < 0) {
                    throw new Error("El valor debe ser maor a 0")
                } else {
                    return true
                }
            }
        } else {
            return true
        }
    } catch (e) {
        throw e
    }
};;
const createTipoDeduccionSchema = {
    es_ley: {
        exists: {
            bail: true,
            errorMessage: "Es requerido si es ley",
            options: { values: 'null' }
        },
        isBoolean: {
            errorMessage: "Debe ser boleano",
        }
    },
    porcentual: {
        exists: {
            bail: true,
            errorMessage: "Es requerido la jefatura",
            options: { values: 'null' }
        },
        isBoolean: {
            errorMessage: "Debe ser boleano",
        }
    },
    nombre_descuento: {
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        escape: true,
    },
    valor: {
        custom: {
            options: validateValor,
        },
    }
};
export default createTipoDeduccionSchema;
