import {
    TipoDeduccion,
    DeduccionPlanillaEmpleado,
    DeduccionEmpleado
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class TipoDeduccionController {
    static async index(req, res) {
        try {
            const datos = await TipoDeduccion.findAll();
            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { es_ley, nombre_descuento, porcentual, valor } =
                req.body;
            await TipoDeduccion.create({
                es_ley,
                nombre_descuento,
                porcentual,
                valor
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
            const { es_ley, nombre_descuento, porcentual, valor } =
                req.body;
            const { id_deduccion } = req.params;
            await TipoDeduccion.update({
                es_ley,
                nombre_descuento,
                porcentual,
                valor
            }, {
                where: {
                    id_deduccion,
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
            const { id_deduccion } = req.params;
            const existe1 = await DeduccionEmpleado.findOne({
                where: {
                    id_tipo_deduccion: id_deduccion,
                },
            });
            const existe2 = await DeduccionPlanillaEmpleado.findOne({
                where: {
                    id_tipo_deduccion: id_deduccion,
                },
            });
            if (!!existe1 || !!existe2) {
                throw new BadRequestException(
                    "No se puede eliminar, existe deducciones que tienen asignado este tipo deduccion."
                );
            }
            await TipoDeduccion.destroy({
                where: {
                    id_deduccion,
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
