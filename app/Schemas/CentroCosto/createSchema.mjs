import { Dependencia, CentroCosto } from "../../models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const verifyDecimals = (value) => {
    const valid = /^\d+(\.\d{2})?$/.test(value)
    if (!valid) {
        throw new Error("Solo se permite dos decimales")
    } else {
        return true
    }

}
const verifyIsFirst = async (value, { req }) => {
    const all = await CentroCosto.findOne(
        {
            where: {
                id_dependencia: req.body.id_dependencia,
                anio_centro_costo: req.body.anio_centro_costo,
            }
        }
    );
    if (!!all) {
        throw new Error("Ya existe un costo anual para esta dependencia en el presente año");
    } else {
        return true
    }
}
const validateIdDependencia = async (value, { req }) => {
    try {
        await verifyDataExist(value, req, 'id_dependencia', Dependencia);
        await verifyIsFirst(value, { req })
    } catch (e) {
        throw e
    }
}
const createCentroCostoSchema = {
    id_dependencia: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el id dependencia.",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: validateIdDependencia
        }
    },
    monto_anual: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el monto anual",
            options: { values: 'falsy' }
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 100 y 1,000,000",
            options: { min: 100, max: 1000000 }
        },
        custom: {
            bail: true,
            options: verifyDecimals,
        },
    },
    anio_centro_costo: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el año",
            options: { values: 'falsy' }
        },
        isInt: {
            bail: true,
            options: { min: 2023, max: 2100 },
            errorMessage: "Debe ser un año válido",
        },
    }
};
export default createCentroCostoSchema;
