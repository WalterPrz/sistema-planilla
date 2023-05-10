import {
    PuestoTrabajo,
    TipoDependencia,
    Dependencia,
    PuestoTrabajoDependencia,
    Empleado,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class DependenciaController {
    static async index(req, res) {
        try {
            const datos = await PuestoTrabajoDependencia.findAll({
                include: [
                    {
                        attributes: ['nombre_puesto_trabajo'],
                        model: PuestoTrabajo,
                    },
                    {
                        attributes: ['nombre_dependencia'],
                        model: Dependencia,
                        include: {
                            attributes: ['nombre_tipo_dependencia'],
                            model: TipoDependencia
                        }
                    },
                ],
            });
            const datos_clear = datos.map((x) => {
                return {
                    id_puesto_trabajo_dependencia: x.id_puesto_trabajo_dependencia ,
                    id_puesto_trabajo: x.id_puesto_trabajo ,
                    id_dependencia: x.id_dependencia ,
                    salario_minimo: x.salario_minimo ,
                    salario_maximo: x.salario_maximo ,
                    plazas: x.plazas ,
                    jefatura: x.jefatura ,
                    nombre_puesto_trabajo: x.PuestoTrabajo.nombre_puesto_trabajo,
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
            const { id_puesto_trabajo, id_dependencia, salario_minimo, salario_maximo, plazas, jefatura } =
                req.body;
            await PuestoTrabajoDependencia.create({
                id_puesto_trabajo,
                id_dependencia,
                salario_minimo,
                salario_maximo,
                plazas,
                jefatura,
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
            const { id_puesto_trabajo, id_dependencia, salario_minimo, salario_maximo, plazas, jefatura } =
                req.body;
            const { id_puesto_trabajo_dependencia } = req.params;
            await PuestoTrabajoDependencia.update({
                    id_puesto_trabajo,
                    id_dependencia,
                    salario_minimo,
                    salario_maximo,
                    plazas,
                    jefatura,
                },
                {
                    where: {
                        id_puesto_trabajo_dependencia,
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
            const { id_puesto_trabajo_dependencia } = req.params;
            const existe = await Empleado.findOne({
                where: {
                    id_puesto_trabajo_dependencia,
                },
            });
            if (!!existe) {
                throw BadRequestException(
                    "No se puede eliminar, existe empleados que tienen asignado este puesto."
                );
            }
            await PuestoTrabajoDependencia.destroy({
                where: {
                    id_puesto_trabajo_dependencia,
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
