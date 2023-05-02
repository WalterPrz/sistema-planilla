import jwt from "jsonwebtoken";
import moment from "moment";
import NoAuthException from "../../handlers/NoAuthException.mjs";
import Usuario from "../models/Usuario.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";

const validateToken = async(req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization) throw new NoAuthException();
    authorization = authorization.split(" ");
    if (authorization.length < 2) throw new NoAuthException();
    const token = authorization[1];
    const { iat, id_usuario, id_empleado, correo_institucional } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const usuario = await Usuario.findOne({
      where: { id_usuario, activo: true },
    });
    if (!usuario) throw new NoAuthException();
    req.usuario = usuario
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(HttpCode.HTTP_UNAUTHORIZED).json({
        message: "Token expirado",
      });
    }else{
        throw e
    }
  }
}
export {validateToken}
