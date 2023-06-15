import { Planilla,  Empleado, TipoBono } from "../../models/index.mjs";
import  { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
import moment from "moment";
const verifyDecimals = (value) => {
    const valid = /^\d+(\.\d{2})?$/.test(value)
    if (!valid) {
        throw new Error("Solo se permite dos decimales")
    } else {
        return true
    }

}
const validateAnioMes = async (value, { req }) => {
    try {
        const mes = moment(value, "YYYY-MM", true).month() + 1;
        const anio = moment(value, "YYYY-MM", true).year();
        const ismayor = moment().isBefore(moment(value, "YYYY-MM"))
        if (ismayor) {
            throw new Error("No se puede realizar una planilla del futuro")
        }
        const data = await Planilla.findOne({
            where: {
                mes_planilla: mes,
                anio_planilla: anio,
            }
        })
        if (!!data) {
            throw new Error("Ya existe una planilla para este mes y año")
        }
    } catch (e) {
        throw e
    }
}
const verifyArrayBonos = async (value, { req }) => {
    try {
        for (const item of value) {
            if(!!item.id_tipo_bono ==false) throw new Error("Es requerido el id_tipo_bono")
            if(!!item.empleados ==false) throw new Error("Es requerido el empleados")
            if(!!item.valor ==false) throw new Error("Es requerido el valor")
            if(!!item.descripcion_concepto ==false) throw new Error("Es requerido la descripción o concepto")
            if (Array.isArray( item?.empleados)) {
                if (!item?.empleados.includes('*')) {
                    const empleados = await Empleado.findAll({
                        where: {
                            id_empleado: { [Op.in]: item?.empleados }
                        }
                    })
                    if (empleados.length != item.empleados.length) {
                        throw new Error("El array de empleados no coincide con los empleados registrados.")
                    }
                }
            } else {
                throw new Error("Empleados debe ser un array.")
            }
            await verifyDataExist(item.id_tipo_bono, req, 'id_tipo_bono', TipoBono)
            if(item.valor <0)throw new Error("El valor no puede ser negativo")
            verifyDecimals(item.valor)
        }
    } catch (e) {
        throw e
    }
}
const createPlanillaSchema = {
    anio_mes: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el id año y mes.",
            options: { values: 'falsy' }
        },
        custom: {
            bail: true,
            options: validateAnioMes
        }
    },
    array_bonos: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el array de bonos",
        },
        isArray: {
            bail: true,
            options: {
                min: 0,
                max: 50000,
            },
        },
        custom: {
            bail: true,
            options: verifyArrayBonos,
        },
    },
};
export default createPlanillaSchema;
