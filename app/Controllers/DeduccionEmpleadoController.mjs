import {
    DeduccionEmpleado,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class DeduccionEmpleadoController {
    static async index(req, res) {
        try {
            const { id_empleado } = req.params;
            const datos = await DeduccionEmpleado.findAll({where:{
                id_empleado
            }});
            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const { id_empleado, id_tipo_deduccion, monto, descripcion_concepto, activo } = req.body
            await DeduccionEmpleado.create({
                id_empleado,
                id_tipo_deduccion,
                monto,
                descripcion_concepto,
                activo
            })
            return res
                .status(HttpCode.HTTP_CREATED)
                .json({ message: "Ha sido creado con éxito" });

        } catch (e) {
            throw e
        }
    }
    static async update(req, res) {
        try {
            const { id_empleado, id_tipo_deduccion, monto, descripcion_concepto, activo } =
                req.body;
            const { id_deduccion_empleado } = req.params;
            await DeduccionEmpleado.update({
                id_empleado,
                id_tipo_deduccion,
                monto,
                descripcion_concepto,
                activo
            }, {
                where: {
                    id_deduccion_empleado
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
}
