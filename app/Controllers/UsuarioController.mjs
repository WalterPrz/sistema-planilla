import { Usuario, Empleado, Rol } from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment";
export default class UsuarioController {
  static async store(req, res) {
    try {
      const { correo_institucional, clave, id_rol, id_empleado } = req.body;
      const salt = await bcrypt.genSalt(10);
      const contrasena = await bcrypt.hash(clave, salt);
      const usuario = await Usuario.create({
        correo_institucional,
        contrasena,
        id_rol,
        id_empleado,
        activo: true,
      });
      res.status(HttpCode.HTTP_CREATED).json({
        message: "Usuario creado con éxito.",
      });
    } catch (e) {
      throw e;
    }
  }
  static async index(req, res) {
    const data = await Usuario.findAll({
      attributes: [
        "id_usuario",
        "activo",
        "correo_institucional",
        "id_empleado",
        "id_rol",
        "ultima_conexion",
      ],
      include: [
        {
          required: true,
          model: Empleado,
          attributes: [
            "apellido_casada",
            "fecha_fin",
            "primer_apellido",
            "primer_nombre",
            "segundo_apellido",
            "segundo_nombre",
          ],
        },
        {
          required: true,
          model: Rol,
        },
      ],
    });
    const data_clear = data.map((item) => {
      return {
        id_usuario: item.id_usuario,
        activo: item.activo,
        correo_institucional: item.correo_institucional,
        id_empleado: item.id_empleado,
        id_rol: item.id_rol,
        ultima_conexion: item.ultima_conexion,
        apellido_casada: item.Empleado.apellido_casada,
        fecha_fin: item.Empleado.fecha_fin,
        primer_apellido: item.Empleado.primer_apellido,
        primer_nombre: item.Empleado.primer_nombre,
        segundo_apellido: item.Empleado.segundo_apellido,
        segundo_nombre: item.Empleado.segundo_nombre,
        nombre_rol: item.Rol.nombre_rol,
        descripcion_rol: item.Rol.descripcion_rol,
      };
    });
    res.status(HttpCode.HTTP_OK).json(data_clear);
  }
  static async updateUser(req, res) {
    try {
      const { correo_institucional, clave, id_empleado, id_rol } = req.body;
      const { id_usuario } = req.params;
      let data = {
        correo_institucional,
        id_empleado,
        id_rol,
      };
      if (!!clave && clave != "") {
        const salt = await bcrypt.genSaltSync(10);
        const contrasena = await bcrypt.hash(clave, salt);
        data.contrasena = contrasena;
      }
      await Usuario.update(data, { where: { id_usuario } });
      res.status(HttpCode.HTTP_OK).json({
        message: "Usuario actualizado con éxito.",
      });
    } catch (e) {
      throw e;
    }
  }
  static async setStatus(req, res){
    const { id_usuario } = req.params;
    const usuario = await Usuario.findByPk(id_usuario,{
      attributes: ['id_usuario','activo']
    })
    if(!!id_usuario){
      await usuario.update({
        activo: !usuario.activo
      })
    }else{
      throw new BadRequestException("El usuario no existe.")
    }
    res.status(HttpCode.HTTP_OK).json({
      message: `El usuario se ha ${!usuario.activo ? 'desactivado' :  'activado'} con éxito.`
    });
  }
}
