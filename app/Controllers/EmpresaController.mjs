import { Empresa } from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class EmpresaController {
    static async index(req, res) {
        try {
            const datos = await Empresa.findOne();
            res.status(HttpCode.HTTP_OK).json(datos);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        try {
            const {
                nombre_empresa,
                representante_legal,
                nic,
                telefono,
                pagina_web,
                direccion_empresa,
                nit,
            } = req.body;
            await Empresa.create({
                nombre_empresa,
                representante_legal,
                nic,
                telefono,
                pagina_web,
                direccion_empresa,
                nit,
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
            const {
                nombre_empresa,
                representante_legal,
                nic,
                telefono,
                pagina_web,
                direccion_empresa,
                nit,
            } = req.body;
            const { id_empresa } = req.params;
            await Empresa.update(
                {
                    nombre_empresa,
                    representante_legal,
                    nic,
                    telefono,
                    pagina_web,
                    direccion_empresa,
                    nit,
                },
                {
                    where: {
                        id_empresa,
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
}
