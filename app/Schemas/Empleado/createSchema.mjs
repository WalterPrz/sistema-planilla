import {
  Empleado,
  PuestoTrabajoDependencia,
  Genero,
  EstadoCivil,
  Municipio,
  Profesion,
  Usuario,
  TipoDocumento,
  DocumentoEmpleado,
} from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from "../utils.mjs";
import {
  validateIdPuestoTrabajoDependenciaCreate,
  verifyIsOld,
  validateSalarioCreate,
  validateArrayDocumentos,
  setOnlyByTipo
} from "./utils.mjs";
const customVerifyExist = callValidateFunc(verifyDataExist);

const createEmpleadoSchema = {
  id_puesto_trabajo_dependencia: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el id tipo dependencia.",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el tipo de dependencia.",
    },
    custom: {
      bail: true,
      options: validateIdPuestoTrabajoDependenciaCreate,
    },
  },
  id_genero: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el género",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el género.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_genero", Genero),
    },
  },
  id_estado_civil: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el estado civil.",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto el estado civil.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_estado_civil", EstadoCivil),
    },
  },
  id_municipio: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el id tipo dependencia.",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el municipio.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_municipio", Municipio),
    },
  },
  id_profesion: {
    exists: {
      bail: true,
      errorMessage: "Es requerido la profesión.",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en la profesión.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_profesion", Profesion),
    },
  },
  array_documentos: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el array de documentos.",
    },
    isArray: {
      bail: true,
    },
    customSanitizer: {
      options: setOnlyByTipo,
    },
    custom: {
      bail: true,
      options: validateArrayDocumentos,
    },
  },
  apellido_casada: {
    trim: true,
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 0,
        max: 30,
      },
      errorMessage: "Máximo 30 caracteres",
    },
  },
  barrio_colonia_residencial: {
    trim: true,
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 0,
        max: 50,
      },
      errorMessage: "Máximo 50 caracteres",
    },
  },
  calle_avenida: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar una calle o avenida",
    },
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50,
      },
      errorMessage: "Máximo 50 caracteres",
    },
  },
  fecha_de_nacimiento: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar una fecha de nacimiento",
    },
    escape: true,
    isDate: {
      options: {
        format: "YYYY-MM-DD",
      },
      errorMessage: "Fecha de nacimiento inválida",
    },
    custom: {
      options: verifyIsOld,
    },
  },
  id_empleado_jefe: {
    // isInt: {
    //   options:{
    //     allow_leading_zeroes:true
    //   },
    //   bail: true,
    //   errorMessage: "Valor incorrecto para el empleado jefe.",
    // },
    // custom: {
    //   bail: true,
    //   options: customVerifyExist("id_empleado", Empleado),
    // },
  },
  numero_casa_apto: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar el número de casa o apartamento",
    },
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 25,
      },
      errorMessage: "Máximo 25 caracteres",
    },
  },
  pasaje_senda: {
    trim: true,
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 0,
        max: 25,
      },
      errorMessage: "Máximo 50 caracteres",
    },
  },
  primer_apellido: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar el primer apellido.",
    },
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 30,
      },
      errorMessage: "Máximo 30 caracteres",
    },
  },
  primer_nombre: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar el primer nombre.",
    },
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 30,
      },
      errorMessage: "Máximo 30 caracteres",
    },
  },
  salario: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el salario máximo",
      options: { values: "falsy" },
    },
    isFloat: {
      bail: true,
      errorMessage: "El valor debe estar entre 100 y 100,000",
      options: { min: 100, max: 100000 },
    },
    custom: {
      bail: true,
      options: validateSalarioCreate,
    },
  },
  segundo_apellido: {
    trim: true,
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 0,
        max: 30,
      },
      errorMessage: "Máximo 30 caracteres",
    },
  },
  segundo_nombre: {
    trim: true,
    escape: true,
    isString: true,
    isLength: {
      options: {
        min: 0,
        max: 30,
      },
      errorMessage: "Máximo 30 caracteres",
    },
  },
};
export default createEmpleadoSchema;
