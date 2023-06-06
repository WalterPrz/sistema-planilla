import {
    CondicionesDeduccion,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class CondicionesDeduccionController {
    static async index(req, res) {
        const { id_tipo_deduccion } = req.params
        try {
            const datos = await CondicionesDeduccion.findAll({
                where: {
                    id_tipo_deduccion
                }
            });

            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { desde, hasta, mas_cuota_fija, nombre_condicion, porcentaje, sobre_exceso } =
                req.body;
            const { id_tipo_deduccion } = req.params
            await CondicionesDeduccion.create({
                desde,
                hasta,
                mas_cuota_fija,
                nombre_condicion,
                porcentaje,
                sobre_exceso,
                id_tipo_deduccion
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
            const { desde, hasta, mas_cuota_fija, nombre_condicion, porcentaje, sobre_exceso } = req.body;
            const { id_condicion_descuento } = req.params;
            await CondicionesDeduccion.update({
                desde,
                hasta,
                mas_cuota_fija,
                nombre_condicion,
                porcentaje,
                sobre_exceso,
            }, {
                where: {
                    id_condicion_descuento
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
            const { id_condicion_descuento } = req.params;
            await CondicionesDeduccion.destroy({
                where: {
                    id_condicion_descuento,
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
