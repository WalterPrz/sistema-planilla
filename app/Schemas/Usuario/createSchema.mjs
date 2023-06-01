import { Empleado, Rol, Usuario } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from "../utils.mjs";
const customVerifyExist = callValidateFunc(verifyDataExist);
const toLowerCase = (value)=> value.toLowerCase() 
const verifyEmailExist = async (value) => {
  const user = await Usuario.findOne({
    where: { correo_institucional: value },
  });
  if (user) {
    throw new Error("El correo ya existe");
  } else {
    return true;
  }
};
const validateIdEmpleado = async (value, {req}) => {
  try {
    await verifyDataExist(value, req, 'id_empleado', Empleado)
    const empleado = await Usuario.findOne({
      where: {
        id_empleado:value,
      },
    });
    if (!!empleado) {
      throw new Error("Ya existe este empleado registrado con un usuario.");
    }
  } catch (e) {
    throw e;
  }
};
const verifyConfirmPass = (value, { req }) => {
  return value === req.body.clave;
};
const UsuarioCreateSchema = {
  correo_institucional: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar un correo.",
    },
    escape: true,
    customSanitizer: {
        options: toLowerCase,
    },
    isEmail: {
      bail: true,
      errorMessage: "Tiene que ser un correo válido",
    },
    custom: {
      errorMessage: "El correo ya existe.",
      options: verifyEmailExist,
    },
  },
  id_empleado: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el empleado",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el empleado.",
    },
    custom: {
      bail: true,
      options: validateIdEmpleado,
    },
  },
  id_rol: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el rol",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el rol.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_rol", Rol),
    },
  },
  clave: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar una clave",
    },
    escape: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Debes ingresar una clave con mínimo  6 caracteres",
    },
  },
  confirmacionClave: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar repetir la clave.",
    },
    escape: true,
    custom: {
      errorMessage: "No coincide la clave de confirmación.",
      options: verifyConfirmPass,
    },
  },
};
export default UsuarioCreateSchema;
