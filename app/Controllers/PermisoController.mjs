import {
    Permiso,
    PermisoRol,
    TipoPermiso
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class PermisoController {
    static async index(req, res) {
        try {
            const datos = await Permiso.findAll({
                include:[
                    {
                        attributes:['nombre'],
                        model: TipoPermiso,
                    }
                ]
            });
            const datos_clear = datos.map((x) => {
                return {
                    id_permiso: x.id_permiso,
                    nombre_permiso: x.nombre_permiso,
                    id_tipo_permiso: x.id_tipo_permiso,
                    nombre_tipo_permiso: x.TipoPermiso.nombre
                }
            })
            res.status(HttpCode.HTTP_OK).json(datos_clear);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { nombre_permiso, id_tipo_permiso } =
                req.body;
            await Permiso.create({
                nombre_permiso,
                id_tipo_permiso,
            });
            res.status(HttpCode.HTTP_CREATED)
                .json({ message: "Ha sido creado con éxito" });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async update(req, res) {
        try {
            const { nombre_permiso, id_tipo_permiso } =
                req.body;
            const { id_permiso } = req.params;
            await Permiso.update({
                nombre_permiso,
            }, {
                where: {
                    id_permiso,
                    id_tipo_permiso
                },
            });
            res
                .status(HttpCode.HTTP_OK)
                .json({ message: "Se ha actualizado con éxito" });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async delete(req, res) {
        try {
            const { id_permiso } = req.params;
            const existe = await PermisoRol.findOne({
                where: {
                    id_permiso,
                },
            });
            if (!!existe) {
                throw new BadRequestException(
                    "No se puede eliminar, existe roles que tienen asignado este permiso."
                );
            }
            await Permiso.destroy({
                where: {
                    id_permiso,
                },
            });
            res
                .status(HttpCode.HTTP_OK)
                .json({ message: "Se ha eliminado con éxito" });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
