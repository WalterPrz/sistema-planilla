import { Usuario } from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Auth from "../utils/Auth.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";
import moment from "moment";
export default class AuthController {
  static async register(req, res) {
    try {
      const { correo_institucional, clave, id_rol, id_empleado } = req.body;
      const salt = await bcrypt.genSalt(10);
      const contrasena = await bcrypt.hash(clave, salt);
      const usuario = await Usuario.create({
        correo_institucional,
        contrasena,
        id_rol,
        activo: true,
      });
      res.status(HttpCode.HTTP_CREATED).json({
        usuario,
        message: "Usuario creado con éxito.",
      });
    } catch (e) {
      throw e;
    }
  }
  static async login(req, res) {
    try {
      const { correo_institucional, clave } = req.body;
      const usuario = await Usuario.findOne({
        where: {
          correo_institucional,
        },
      });
      if (!!usuario) {
        const coincideClave = await bcrypt.compare(clave, usuario?.contrasena);
        if (!coincideClave) {
          throw new BadRequestException("Credenciales no válidas");
        }
      } else {
        throw new BadRequestException("Credenciales no válidas");
      }
      const refreshToken = await Auth.refresh_token(usuario);
      const token = await Auth.createToken(
        {
          id_usuario: usuario.id_usuario,
          id_empleado: usuario.id_empleado,
          id_rol: usuario.id_rol,
          correo_institucional: usuario.correo_institucional,
          refreshToken,
        },
        process.env.JWT_SECRET
      );
      Usuario.update(
        {
          ultima_conexion: moment().tz("America/El_Salvador").format(),
          token_valid_after: moment()
            .subtract(
              process.env.REFRESH_TOKEN_INVALID_EXPIRATION_TIME,
              process.env.REFRESH_TOKEN_INVALID_EXPIRATION_TYPE
            )
            .tz("America/El_Salvador")
            .format(),
        },
        { where: { id_usuario: usuario.id_usuario } }
      );
      res.status(HttpCode.HTTP_OK).json({
        message: "Inicio de sesión correcto",
        token,
      });
    } catch (e) {
      throw e;
    }
  }
  static async logout(req, res) {
    try {
      await Usuario.update(
        {
          token_valid_after: moment().tz("America/El_Salvador").format(),
        },
        { where: { id_usuario: req.usuario.id_usuario } }
      );
      return res.status(HttpCode.HTTP_OK).send({message:'Se ha cerrado la sesión.'});
    } catch (e) {
      throw e;
    }
  }
}
