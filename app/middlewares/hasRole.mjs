import HttpCode from '../../configs/HttpCodes.mjs';
import ForbiddenException from '../../handlers/ForbiddenException.mjs';
import NoAuthException from "../../handlers/NoAuthException.mjs";
import { Permiso, PermisoRol, Rol, Usuario } from '../models/index.mjs';
const validateRole = (nombre_rol) => async (req, res, next) => {
    try {
        if (!!req?.usuario?.id_usuario) {
            const infoUsuario = await Usuario.findOne({
                attributes: ['id_usuario'],
                include: [
                    {
                        required: true,
                        model: Rol,
                        include: {
                            required: true,
                            model: PermisoRol,
                            include: {
                                required: true,
                                model: Permiso
                            }
                        }
                    }
                ],
                where: {
                    id_usuario: req.usuario.id_usuario
                }
            })
            const permisos = []
            if (!!infoUsuario && !!infoUsuario?.Rol) {
                infoUsuario.Rol.PermisoRols.map((x) => {
                    permisos.push(x.Permiso.nombre_permiso)
                })
                const havePermision = await permisos.find((rol) => rol === nombre_rol);
                if (!!havePermision) {
                    return next()
                } else {
                    throw new ForbiddenException();
                }
            } else {
                throw new ForbiddenException();
            }
        } else {
            throw new NoAuthException();
        }
    } catch (e) {
        next(e)
    }

};
export default validateRole;