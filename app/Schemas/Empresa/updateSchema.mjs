import { Empresa } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);

const updateEmpresaSchema = {
    id_empresa: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_empresa', Empresa)
        },
    },
    nombre_empresa: {
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
    },
    representante_legal: {
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
    nic: {
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
    telefono: {
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
    pagina_web: {
        trim: true,
        notEmpty: {
            bail: true,
            errorMessage: "Debes ingresar una pagina web.",
        },
        escape: true,
        isString: true,
        isLength: {
            options: {
                min: 5,
                max: 75,
            },
            errorMessage: "Máximo 50 caracteres",
        }
    },
    direccion_empresa: {
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
    nit: {
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
export default updateEmpresaSchema;
