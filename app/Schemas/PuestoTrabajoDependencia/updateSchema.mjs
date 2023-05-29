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
const verifyNotExist  = async (value,{req})=>{
    const puesto = await PuestoTrabajoDependencia.findOne({
        where:{
            id_dependencia: req.body.id_dependencia,
            id_puesto_trabajo: req.body.id_puesto_trabajo,
            id_puesto_trabajo_dependencia: {[Op.ne]:req.params.id_puesto_trabajo_dependencia}
        }
    })
    if (!!puesto) {
        throw new Error("Ya existe el puesto de trabajo en esta dependencia.")
    }else{
        return true
    } 
}
const validateIdPuestoTrabajo = async (value,{req})=>{
    try{
        await verifyDataExist(value, req, 'id_puesto_trabajo', PuestoTrabajo)
        await verifyNotExist(value, {req})
    }catch(e){
        throw e
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
const updatePuestoTrabajoDependenciaSchema = {
    id_puesto_trabajo_dependencia:{
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el puesto de trabajo dependencia",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_puesto_trabajo_dependencia', PuestoTrabajoDependencia)
        },
    },
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
            options: validateIdPuestoTrabajo
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
            options: { min: 100, max: 100000 }
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
            options: { min: 100, max: 100000 }
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
            options: { min: 0, max: 100 },
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
export default updatePuestoTrabajoDependenciaSchema