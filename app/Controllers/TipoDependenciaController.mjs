import {TipoDependencia, Dependencia} from '../models/index.mjs'
import HttpCode from '../../configs/HttpCodes.mjs';
import BadRequestException from '../../handlers/BadRequestException.mjs';
export default class PuestoTrabajoController{
    static async index(req, res){
        try{
            const datos = await TipoDependencia.findAll({order: [['nombre_tipo_dependencia', 'ASC']]});
            res.status(HttpCode.HTTP_OK).json(datos)
        }catch(e){
            console.log(e);
            throw e
        }
    }
    static async store(req, res){
        try{
            const {nombre_tipo_dependencia } = req.body
            await TipoDependencia.create({
                nombre_tipo_dependencia,
            });
            res.status(HttpCode.HTTP_CREATED).json({message: "Ha sido creado con éxito"})
        }catch(e){
            console.log(e);
            throw e
        }
    }
    static async update(req, res){
        try{
            const {nombre_tipo_dependencia} = req.body
            const {id_tipo_dependencia} = req.params
            await TipoDependencia.update({
                nombre_tipo_dependencia,
            },{
                where:{
                    id_tipo_dependencia
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
            const {id_tipo_dependencia} = req.params
            const existe = await Dependencia.findOne({
                where:{
                    id_tipo_dependencia
                }
            })
            if(!!existe){
                throw new BadRequestException("No se puede eliminar, existe dependencias que tienen asignado este puesto.")
            }
            await TipoDependencia.destroy({
                where:{
                    id_tipo_dependencia
                }
            })
            res.status(HttpCode.HTTP_OK).json({message:"Se ha eliminado con éxito"})
        }catch(e){
            console.log(e);
            throw e
        }
    }
}