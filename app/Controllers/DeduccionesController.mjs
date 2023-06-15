import {
    DeduccionPlanillaEmpleado,
    Empleado,
    TipoDeduccion,
    CondicionesDeduccion,
    PlanillaEmpleado,
} from "../models/index.mjs";
import NotFoundException from "../../handlers/NotFoundExeption.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";

export default class DeduccionesController {
    static async index(req, res) {
        const deducciones = await CondicionesDeduccion.findAll({
            include: {
                model: TipoDeduccion,
            },
        });
        return res.status(200).json(deducciones);
    }
    static async getEmpleadoDeducciones(req, res) {
        const { id_empleado: idEmpleado } = req.params;
        
        const empleado = await Empleado.findByPk(idEmpleado, {
            include: {
                model: PlanillaEmpleado,
                include: {
                    model: DeduccionPlanillaEmpleado,
                    include: {
                        model: TipoDeduccion,
                    },
                }
            },
        });
        if (!empleado)
            throw new NotFoundException("No se ha encontrado el empleado");

        return res.status(HttpCode.HTTP_OK).json(empleado);
    }
}