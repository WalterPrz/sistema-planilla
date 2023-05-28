import CondicionDeduccion from "../models/Deduccion.mjs";
import TipoDeduccion from "../models/TipoDeduccion.mjs";

export default class DeduccionesController {
    static async index(req, res){
        const deducciones = await CondicionDeduccion.findAll({
            include: {
                model: TipoDeduccion
            }
        });
 
        return res.status(200).json(deducciones);
    }
}
