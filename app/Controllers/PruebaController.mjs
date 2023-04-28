import {EstructuraTerritorial, Departamento} from '../models/index.mjs'
import HttpCode from '../../configs/HttpCodes.mjs'
export default class PruebaController{
    static async index(req, res){
        try{
            const departamentos = await Departamento.findAll({
                include:[{
                    model: EstructuraTerritorial
                }]
            });
            res.status(HttpCode.HTTP_OK).json(departamentos)
        }catch(e){
            console.log(e);
            throw e
        }
    }
}