import { CondicionesDeduccion, TipoDeduccion } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const verifyDecimals = (value) => {
    const valid = /^\d+(\.\d{2})?$/.test(value);
    if (!valid) {
        throw new Error("Solo se permite dos decimales");
    } else {
        return true;
    }
};
const validateHasta = async (value, { req }) => {
    try {
        if (parseFloat(value) == 'NaN') {
            throw new Error("El valor debe ser de tipo decimal")
        }
        if (value == null) {
            return true
        } else {
            verifyDecimals(value)
            if (value < 0 || value > 100000) {
                throw new Error("El valor debe estar entre 0 y 1000")
            } else {
                return true
            }
        }
    } catch (e) {
        throw e
    }
}
const validateDesde = async (value, { req }) => {
    try {
        if (value > req.body.hasta && req.body.hasta != null) {
            throw new Error("El valor no puede ser mayor al valor de hasta")
        }
        const encontrado = await CondicionesDeduccion.findOne({
            where: {
                [Op.and]:
                    [
                        { hasta: { [Op.gte]: value } },
                        { desde: { [Op.lte]: value } },
                        { id_tipo_deduccion: req.params.id_tipo_deduccion }
                    ]
            }
        })
        if (!!encontrado == false) {
            const encontrado2 = await CondicionesDeduccion.findOne({
                where: {
                    [Op.and]:
                        [
                            { hasta: null },
                            { desde: { [Op.lte]: value } },
                            { id_tipo_deduccion: req.params.id_tipo_deduccion }
                        ]
                }
            })
            if (!!encontrado2) {
                throw new Error("Este valor ya existe en un registro que tiene el valor hasta al infinito")
            } else {
                verifyDecimals(value)
            }
        } else {
            throw new Error("Este valor ya existe en un registro")
        }
    } catch (e) {
        throw e
    }
}
const createCondicionesDeduccionSchema = {
    id_tipo_deduccion: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el de id_tipo_deduccion",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_deduccion', TipoDeduccion)
        },
    },
    nombre_condicion: {
        trim: true,
        isString: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre.",
        },
        escape: true,
    },
    desde: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el desde",
            options: { values: "null" },
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 0 y 100,000",
            options: { min: 0, max: 100000 },
        },
        custom: {
            bail: true,
            options: validateDesde,
        },
    },
    hasta: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el desde",
            options: { values: "undefined" },
        },
        custom: {
            bail: true,
            options: validateHasta,
        },
    },
    porcentaje: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el porcentaje",
            options: { values: "null" },
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 0 y 100,000",
            options: { min: 0, max: 100 },
        },
        custom: {
            bail: true,
            options: verifyDecimals,
        },
    },
    sobre_exceso: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el sobre exceso",
            options: { values: "null" },
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 0 y 100,000",
            options: { min: 0, max: 100000 },
        },
        custom: {
            bail: true,
            options: verifyDecimals,
        },
    },
    mas_cuota_fija: {
        exists: {
            bail: true,
            errorMessage: "Es requerido el mas cuota fija",
            options: { values: "null" },
        },
        isFloat: {
            bail: true,
            errorMessage: "El valor debe estar entre 0 y 100,000",
            options: { min: 0, max: 100000 },
        },
        custom: {
            bail: true,
            options: verifyDecimals,
        },
    },
};
export default createCondicionesDeduccionSchema;
