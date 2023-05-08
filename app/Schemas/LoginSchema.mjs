const LoginSchema = {
    correo_institucional: {
      trim: true,
      notEmpty: {
          bail: true,
          errorMessage: "Debes ingresar un correo.",
      },
      escape: true,
      isEmail: {
          bail: true,
          errorMessage: "Tiene que ser un correo válido",
      },
    },
    clave: {
      trim: true,
      notEmpty: {
        bail: true,
        errorMessage: "Debes ingresar una clave",
      },
    },
  };
  export default LoginSchema;
  