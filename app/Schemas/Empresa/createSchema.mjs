import { Empresa } from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
const verifyUnique = async (value, {req}) => {
    const exist = await Empresa.findAll();
    if (exist.length >0) {
        throw new Error("Ya no se puede crear otra empresa.");
    } else {
        return true;
    }
};

const createEmpresaSchema = {
    nombre_empresa:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nombre de la empresa.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage: "Máximo 100 caracteres",
        },
        custom: {
            bail: true,
            options: verifyUnique
        },
    },
    representante_legal:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un representante legal.",
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
    nic:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nic.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 5,
                max: 50,
            },
            errorMessage: "Máximo 50 caracteres",
        }
    },
    telefono:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un teléfono.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 8,
                max: 8,
            },
            errorMessage: "Deben ser 8 caracteres",
        }
    },
    pagina_web:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar una pagina web.",
        },
      
        isString: true,
        isLength: {
            options: {
                min: 5,
                max: 75,
            },
            errorMessage: "Máximo 50 caracteres",
        }
    },
    direccion_empresa:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar una dirección.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 5,
                max: 50,
            },
            errorMessage: "Maximo 50 caracteres",
        }
    },
    nit:{
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar un nit.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 16,
                max: 16,
            },
            errorMessage: "Deben ser 16 caracteres",
        }
    }
};
export default createEmpresaSchema;
