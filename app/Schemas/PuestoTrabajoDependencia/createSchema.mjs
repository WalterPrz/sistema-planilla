import { PuestoTrabajo, PuestoTrabajoDependencia, Dependencia } from '../../models/index.mjs'
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const verifyDecimals = (value) => {
    const valid = /^\d+(\.\d{2})?$/.test(value)
    if (!valid) {
        throw new Error("Solo se permite dos decimales")
    } else {
        return true
    }
}
const verifyIsMayor = (value, { req }) => {
    if (value > req.body.salario_maximo) {
        throw new Error("El salario mínimo no tiene que ser mayor al máximo")
    }else{
        return true
    }
}
const validateSalarioMinimo = async (value, {req})=>{
    try{
        verifyDecimals(value);
        verifyIsMayor(value, { req })
    }catch(e){
        throw e
    }
}
const createPuestoTrabajoDependenciaSchema = {
    id_puesto_trabajo: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el puesto de trabajo",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el puesto de trabajo",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_puesto_trabajo', PuestoTrabajo)
        },
    },
    id_dependencia: {
        exists: {
            bail: true,
            errorMessage: "Es requerido la dependencia.",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en la dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_dependencia', Dependencia)
        },
    },
    salario_minimo: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el salario mínimo",
            options: { values: 'falsy' }
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 100 y 100,000",
            options: { min: '100', max: '100000' }
        },
        custom: {
            bail: true,
            options: validateSalarioMinimo,
        },
    },
    salario_maximo: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el salario máximo",
            options: { values: 'falsy' }
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 100 y 100,000",
            options: { min: '100', max: '100000' }
        },
        custom: {
            bail: true,
            options: verifyDecimals,
        },
    },
    plazas: {
        exists: {
            bail: true,
            errorMessage: "Es requerido las plazas",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            options: { min: '1', max: '10000' },
            errorMessage: "Debe ser un numero entero entre 1 y 10000",
        },
    },
    jefatura: {
        exists: {
            bail: true,
            errorMessage: "Es requerido la jefatura",
            options: { values: 'null' }
        },
        isBoolean: {
            errorMessage: "Debe ser boleano",
        }
    },
}
export default createPuestoTrabajoDependenciaSchema