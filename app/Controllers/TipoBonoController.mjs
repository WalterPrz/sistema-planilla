import {
    TipoBono,
    BonosPlanillaEmpleado,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class TipoBonoController {
    static async index(req, res) {
        try {
            const datos = await TipoBono.findAll();

            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { nombre, porcentual, valor } =
                req.body;
            await TipoBono.create({
                nombre,
                porcentual,
                valor,
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
            const { nombre, porcentual, valor } =
                req.body;
            const { id_tipo_bono } = req.params;
            await TipoBono.update({
                nombre,
                porcentual,
                valor,
            }, {
                where: {
                    id_tipo_bono
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
            const { id_tipo_bono } = req.params;
            const existe = await BonosPlanillaEmpleado.findOne({
                where: {
                    id_tipo_bono,
                },
            });
            if (!!existe) {
                throw new BadRequestException(
                    "No se puede eliminar, existen planillas que tienen asignado este bono."
                );
            }
            await TipoBono.destroy({
                where: {
                    id_tipo_bono,
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
