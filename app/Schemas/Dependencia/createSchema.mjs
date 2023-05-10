import { Dependencia, TipoDependencia } from "../../models/index.mjs";
import Sequelize, { Op, where } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);

const verifyIsFirst = async (value, { req }) => {
    const all = await Dependencia.findAll();
    if (all.length > 0 && !!value) {
        await verifyDataExist(value, req, 'id_dependencia', Dependencia)
    } else if (all.length > 0 && !(!!value)) {
        throw new Error("Falta el id de la dependencia padre.");
    } else {
        return true
    }
}
const createDependenciaSchema = {
    id_tipo_dependencia: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el id tipo dependencia.",
            options: { values: 'falsy' }
        },
        isNumeric: {
            options: { no_symbols: true },
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_tipo_dependencia',TipoDependencia)
        },
    },
    id_dependencia_padre: {
        custom: {
            bail: true,
            options: verifyIsFirst,
        },
    },
    nombre_dependencia: {
        trim: true,
        isString: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        escape: true,
    }
};
export default createDependenciaSchema;
