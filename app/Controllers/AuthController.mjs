import { Permiso, PermisoRol, Usuario } from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Auth from "../utils/Auth.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";
import moment from "moment";
import DB from "../DB/connection.mjs";
export default class AuthController {

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
          let attemptsFailedBase = usuario.attempts_failed;
          attemptsFailedBase++;
          const data = {
            attempts_failed: attemptsFailedBase,
          };
          if(attemptsFailedBase >=3){
            data.activo = false;
          }
          await usuario.update(data);
          throw new BadRequestException("Credenciales no válidas");
        }
      } else {
        throw new BadRequestException("Credenciales no válidas");
      }
      const permisos =  await PermisoRol.findAll(
        {
          include:{
            model: Permiso,
            where:{
              id_tipo_permiso:2
            }
          }
        },
        {
          where:{
            id_rol: usuario.id_rol
          }
        }
      )
      const nuevosPermisos = permisos.map((x)=>x?.Permiso?.nombre_permiso)
      const refreshToken = await Auth.refresh_token(usuario);
      const token = await Auth.createToken(
        {
          id_usuario: usuario.id_usuario,
          id_empleado: usuario.id_empleado,
          id_rol: usuario.id_rol,
          correo_institucional: usuario.correo_institucional,
          refreshToken,
          menu_permisos: nuevosPermisos,
        },
        process.env.JWT_SECRET
      );
      if(!usuario.activo){
        throw new BadRequestException("El usuario esta desactivado.");
      }
      Usuario.update(
        {
          attempts_failed:0,
          ultima_conexion: moment().tz("America/El_Salvador").format(),
          token_valid_after: moment()
            .subtract(
              process.env.REFRESH_TOKEN_INVALID_EXPIRATION_TIME,
              process.env.REFRESH_TOKEN_INVALID_EXPIRATION_TYPE
            )
            .tz("America/El_Salvador")
            .format(),
        },
        { where: { id_usuario: usuario.id_usuario }}
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
      return res
        .status(HttpCode.HTTP_OK)
        .send({ message: "Se ha cerrado la sesión." });
    } catch (e) {
      throw e;
    }
  }
  static async isTokenExpired(req, res) {
    return res.status(HttpCode.HTTP_OK).send({ message: "El token es válido" });
  }
}
