import { Op } from "sequelize";
import { Empleado, Rol, Usuario } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from "../utils.mjs";
const customVerifyExist = callValidateFunc(verifyDataExist);
const toLowerCase = (value)=> value.toLowerCase() 
const verifyEmailExist = async (value, { req }) => {
  const user = await Usuario.findOne({
    where: {
      correo_institucional: value,
      id_usuario: { [Op.ne]: req.params.id_usuario },
    },
  });
  if (user) {
    throw new Error("El correo ya existe");
  } else {
    return true;
  }
};
const validateIdEmpleado = async (value, { req }) => {
  try {
    await verifyDataExist(value, req, "id_empleado", Empleado);
    const empleado = await Usuario.findOne({
      where: {
        id_empleado: value,
        id_usuario: { [Op.ne]: req.params.id_usuario },
      },
    });
    if (!!empleado) {
      throw new Error("Ya existe este empleado registrado con un usuario.");
    }
  } catch (e) {
    throw e;
  }
};
const UsuarioCreateSchema = {
  id_usuario: {
    exists: {
      bail: true,
      errorMessage: "Es requerido el usuario",
      options: { values: "falsy" },
    },
    isInt: {
      bail: true,
      errorMessage: "Valor incorrecto en el usuario.",
    },
    custom: {
      bail: true,
      options: customVerifyExist("id_usuario", Usuario),
    },
  },
  correo_institucional: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: "Debes ingresar un correo.",
    },
    customSanitizer: {
      options: toLowerCase,
    },
    escape: true,
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
};
export default UsuarioCreateSchema;
