import {PuestoTrabajo, PuestoTrabajoDependencia} from '../models/index.mjs'
import HttpCode from '../../configs/HttpCodes.mjs';
import BadRequestException from '../../handlers/BadRequestException.mjs';
export default class PuestoTrabajoController{
    static async index(req, res){
        try{
            const datos = await PuestoTrabajo.findAll({order: [['nombre_puesto_trabajo', 'ASC']]});
            res.status(HttpCode.HTTP_OK).json(datos)
        }catch(e){
            console.log(e);
            throw e
        }
    }
    static async store(req, res){
        try{
            const {nombre_puesto_trabajo } = req.body
            await PuestoTrabajo.create({
                nombre_puesto_trabajo,
            });
            res.status(HttpCode.HTTP_CREATED).json({message: "Ha sido creado con éxito"})
        }catch(e){
            console.log(e);
            throw e
        }
    }
    static async update(req, res){
        try{
            const {nombre_puesto_trabajo} = req.body
            const {id_puesto_trabajo} = req.params
            await PuestoTrabajo.update({
                nombre_puesto_trabajo,
            },{
                where:{
                    id_puesto_trabajo
                }
            })
            res.status(HttpCode.HTTP_OK).json({message:"Se ha actualizado con éxito"})
        }catch(e){
            console.log(e);
            throw e
        }
    }
    static async delete(req, res){
        try{
            const {id_puesto_trabajo} = req.params
            const existe = await PuestoTrabajoDependencia.findOne({
                where:{
                    id_puesto_trabajo
                }
            })
            if(!!existe){
                throw BadRequestException("No se puede eliminar, existe dependencias que tienen asignado este puesto.")
            }
            await PuestoTrabajo.destroy({
                where:{
                    id_puesto_trabajo
                }
            })
            res.status(HttpCode.HTTP_OK).json({message:"Se ha eliminado con éxito"})
        }catch(e){
            console.log(e);
            throw e
        }
    }
}