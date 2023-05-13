import { Dependencia, TipoDependencia } from "../../models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);

const verifyIsFirst = async (value, { req }) => {
    if (req.params.id_dependencia == value) {
        throw new Error("No puedes poner de padre a él mismo.");
    }
    const all = await Dependencia.findAll();
    if (all.length > 0 && !!value) {
        await verifyDataExist(value, req, 'id_dependencia', Dependencia)
    } else if (all.length > 0 && !(!!value)) {
        const dependecia = await Dependencia.findOne({
            where: {
                id_dependencia: req.params.id_dependencia
            }
        })
        if (dependecia.id_dependencia_padre != null){
            throw new Error("Falta el parametro de la dependencia padre");
        }else{
            return true
        }
    } else {
        return true
    }
}
const updateDependenciaSchema = {
    id_dependencia: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_dependencia', Dependencia)
        },
    },
    id_tipo_dependencia: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el id tipo dependencia.",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_tipo_dependencia', TipoDependencia)
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
export default updateDependenciaSchema;
