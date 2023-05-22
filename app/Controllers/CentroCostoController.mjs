import {
    TipoDependencia,
    Dependencia,
    CentroCosto,
    PuestoTrabajoDependencia
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import Sequelize, { Op } from "sequelize";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class CentroCostoController {
    static async index(req, res) {
        try {
            const datos = await CentroCosto.findAll({
                include: [
                    {
                        attributes: ['nombre_dependencia'],
                        required: true,
                        model: Dependencia,
                        include: {
                            attributes: ["nombre_tipo_dependencia"],
                            model: TipoDependencia
                        }
                    }
                ],
            });
            const datos_clear = datos.map((x) => {
                return {

                    id_partida_contable: x.id_partida_contable,
                    id_dependencia: x.id_dependencia,
                    monto_anual: x.monto_anual,
                    anio_centro_costo: x.anio_centro_costo,
                    nombre_dependencia: `${x.Dependencium.TipoDependencium.nombre_tipo_dependencia} ${x.Dependencium.nombre_dependencia}`
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
            const { id_dependencia, monto_anual, anio_centro_costo } =
                req.body;
            await CentroCosto.create({
                id_dependencia,
                monto_anual,
                anio_centro_costo,
            });
            res
                .status(HttpCode.HTTP_CREATED)
                .json({ message: "Ha sido creado con éxito" });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async update(req, res) {
        try {
            const { id_dependencia, monto_anual, anio_centro_costo } =
                req.body;
            const { id_partida_contable } = req.params;
            const puestos_asignados = await PuestoTrabajoDependencia.findAll({
                attributes: [
                    "id_dependencia",

                    [Sequelize.literal('SUM(salario_maximo * plazas)'), 'suma_plazas_salario'],
                ],
                group: "id_dependencia",
                where: {
                    id_dependencia
                }
            });
            let monto_minimo = puestos_asignados.length > 0 ? puestos_asignados[0].dataValues.suma_plazas_salario : 0;
            if (puestos_asignados.length != 0 && monto_minimo > monto_anual) {
                throw new BadRequestException("La cantidad es más baja al presupuesto de plazas y salario máximo de puestos.")
            }
            await CentroCosto.update(
                {
                    id_dependencia,
                    monto_anual,
                    anio_centro_costo,
                },
                {
                    where: {
                        id_partida_contable,
                    },
                }
            );
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
            const { id_partida_contable } = req.params;
            const infoCentroCosto = await CentroCosto.findOne({
                include: [{
                    model: Dependencia
                }],
                where: {
                    id_partida_contable
                }
            })
            if (infoCentroCosto) {
                const existe = await PuestoTrabajoDependencia.findOne({
                    where: {
                        id_dependencia: infoCentroCosto?.Dependencium?.id_dependencia,
                    },
                });
                if (!!existe) {
                    throw new BadRequestException(
                        "No se puede eliminar, existe puestos que tienen asignado este dependencia que tiene este presupuesto"
                    );

                }
            }
            await CentroCosto.destroy({
                where: {
                    id_partida_contable,
                },
            });
            res.status(HttpCode.HTTP_OK)
                .json({ message: "Se ha eliminado con éxito" });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
