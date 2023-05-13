import {
    Permiso,
    PermisoRol
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class PermisoController {
    static async index(req, res) {
        try {
            const datos = await Permiso.findAll({
            });
            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { nombre_permiso } =
                req.body;
            await Permiso.create({
                nombre_permiso,
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
            const { nombre_permiso } =
                req.body;
            const { id_permiso } = req.params;
            await Permiso.update({
                nombre_permiso,
            }, {
                where: {
                    id_permiso,
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
                throw BadRequestException(
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
