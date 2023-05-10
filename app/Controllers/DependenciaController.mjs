import {
    TipoDependencia,
    Dependencia,
    PuestoTrabajoDependencia,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class DependenciaController {
    static async index(req, res) {
        try {
            const datos = await Dependencia.findAll({
                include: [
                    {
                        model: TipoDependencia,
                    },
                    {
                        model: Dependencia,
                        as: "padre_dependencia",
                        include: {
                            model: TipoDependencia
                        }
                    },
                ],
            });
            const datos_clear = datos.map((x) => {
                return {
                    id_dependencia: x.id_dependencia,
                    nombre_dependencia: x.nombre_dependencia,
                    id_tipo_dependencia: x.TipoDependencium.id_tipo_dependencia,
                    nombre_tipo_dependencia: x.TipoDependencium.nombre_tipo_dependencia,
                    id_dependencia_padre: x.padre_dependencia?.id_dependencia,
                    nombre_dependencia_padre: x.padre_dependencia?.nombre_dependencia,
                    tipo_dependencia_padre: x.padre_dependencia?.TipoDependencium.nombre_tipo_dependencia,
                    nombre_completo_padre: !!x.padre_dependencia ? `${x.padre_dependencia?.TipoDependencium.nombre_tipo_dependencia} ${x.padre_dependencia?.nombre_dependencia}` : null,
                    nombre_completo: `${x.TipoDependencium.nombre_tipo_dependencia} ${x.nombre_dependencia}`
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
            const { nombre_dependencia, id_dependencia_padre, id_tipo_dependencia } =
                req.body;
            await Dependencia.create({
                nombre_dependencia,
                id_tipo_dependencia,
                id_dependencia_padre,
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
            const { nombre_dependencia, id_tipo_dependencia, id_dependencia_padre } =
                req.body;
            const { id_dependencia } = req.params;
            await Dependencia.update(
                {
                    nombre_dependencia,
                    id_tipo_dependencia,
                    id_dependencia_padre,
                },
                {
                    where: {
                        id_dependencia,
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
            const { id_dependencia } = req.params;
            const existe = await PuestoTrabajoDependencia.findOne({
                where: {
                    id_dependencia,
                },
            });
            if (!!existe) {
                throw BadRequestException(
                    "No se puede eliminar, existe puestos que tienen asignado este dependencia."
                );
            }
            await Dependencia.destroy({
                where: {
                    id_dependencia,
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
