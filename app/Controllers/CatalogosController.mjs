import {
    EstructuraTerritorial,
    Departamento,
    Municipio,
    EstadoCivil,
    Genero,
    Profesion,
    TipoDocumento,
    Documento
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";

export default class CatalogoController {
    static async getEstructuraTerritorial(req, res){
        const datos = await EstructuraTerritorial.findAll()
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getDepartamento(req, res){

        const {id_territorio}= req.query
        let filtro = {}
        if(!!id_territorio){
            console.log("ENTRA ACA")
            filtro = {
                id_territorio,
            }
        }
        const datos =  await Departamento.findAll({
            where:filtro
        })
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getMunicipio(req, res){
        const {id_departamento}= req.query
        let filtro = {}
        if(!!id_departamento){
            filtro = {
                id_departamento,
            }
        }
        const datos =  await Municipio.findAll({
            where:filtro
        })
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getEstadoCivil(req, res){
        const datos = await EstadoCivil.findAll()
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getGenero(req, res){
        const datos = await Genero.findAll()
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getProfesion(req, res){
        const datos = await Profesion.findAll()
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getTipoDocumento(req, res){
        const datos = await TipoDocumento.findAll()
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    static async getDocumento(req, res){
        const {id_tipo_documento}= req.query
        let filtro = {}
        if(!!id_tipo_documento){
            filtro = {
                id_tipo_documento,
            }
        }
        const datos = await Documento.findAll({ where:filtro})
        res.status(HttpCode.HTTP_OK).json(datos);
    }
    
}
