import {
    DeduccionPlanillaEmpleado,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class DeduccionPlanillaEmpleadoController {

    static async store(req, res) {
        try {
            const { id_planilla_empleado, descripcion_concepto, id_tipo_deduccion, monto } =
                req.body;
            await DeduccionPlanillaEmpleado.create({
                id_planilla_empleado,
                descripcion_concepto,
                id_tipo_deduccion,
                monto
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
            const { id_planilla_empleado, descripcion_concepto, id_tipo_deduccion, monto } =
                req.body;
            const { id_deduccion_planilla_empleado } = req.params;
            await DeduccionPlanillaEmpleado.update({
                id_planilla_empleado,
                descripcion_concepto,
                id_tipo_deduccion,
                monto
            }, {
                where: {
                    id_deduccion_planilla_empleado,
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
            const { id_deduccion_planilla_empleado } = req.params;
            await DeduccionPlanillaEmpleado.destroy({
                where: {
                    id_deduccion_planilla_empleado,
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
