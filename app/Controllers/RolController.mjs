import {
    Rol,
    Permiso,
    PermisoRol,
    TipoRol,
    Usuario,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";
import Sequelize, { Op } from "sequelize";
import DB from "../DB/connection.mjs";

export default class RolController {
    static async index(req, res) {
        try {
            const datos = await Rol.findAll({
                include: [
                    {
                        attributes: ['nombre_tipo_rol'],
                        model: TipoRol,
                    },
                    {
                        model: PermisoRol,
                        include: {
                            attributes: ['nombre_permiso'],
                            model: Permiso
                        }
                    },
                ],
            });
            const datos_clear = datos.map((x) => {
                const permisos =  x.PermisoRols.map((y)=>{
                    return{
                        id_permiso_rol: y.id_permiso_rol,
                        id_permiso: y.id_permiso,
                        nombre_permiso: y.Permiso.nombre_permiso,
                    }
                })
                return {
                    id_rol: x.id_rol,
                    id_tipo_rol: x.id_tipo_rol,
                    descripcion_rol: x.descripcion_rol,
                    nombre_rol: x.nombre_rol,
                    nombre_tipo_rol: x.TipoRol.nombre_tipo_rol,
                    PermisoRols: permisos
                }
            })
            res.status(HttpCode.HTTP_OK).json(datos_clear);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    static async store(req, res) {
        const connection = DB.connection();
        const t = await connection.transaction();
        try {
            const { id_tipo_rol, descripcion_rol, nombre_rol, array_permisos } =
                req.body;
            const rol = await Rol.create({
                id_tipo_rol,
                descripcion_rol,
                nombre_rol,
            }, { transaction: t });
            for (const item of array_permisos) {
                await PermisoRol.create({
                    id_rol: rol.id_rol,
                    id_permiso: item
                }, { transaction: t });
            }
            await t.commit()
            res.status(HttpCode.HTTP_CREATED)
                .json({ message: "Ha sido creado con éxito" });
        } catch (e) {
            await t.rollback();
            console.log(e);
            throw e;
        }
    }
    static async update(req, res) {
        const connection = DB.connection();
        const t = await connection.transaction();
        try {
            const { id_tipo_rol, descripcion_rol, nombre_rol, array_permisos, change_permisos } =
                req.body;
            const { id_rol } = req.params;
            await Rol.update({
                id_tipo_rol,
                descripcion_rol,
                nombre_rol,
            }, {
                transaction: t,
                where: {
                    id_rol,
                },
            });
            if (!!change_permisos) {
                const permisos_existe = await PermisoRol.findAll({
                    where: {
                        id_rol,
                        id_permiso: {
                            [Op.in]: array_permisos
                        }
                    }
                });
                const justIdsExisten = permisos_existe.map(x => x.id_permiso)
                if (justIdsExisten) {
                    await PermisoRol.destroy({
                        transaction: t,
                        where: {
                            id_rol,
                            id_permiso: {
                                [Op.notIn]: justIdsExisten
                            }
                        }
                    });
                }
                const justIdsAgregar = array_permisos.filter((element) => !justIdsExisten.includes(element));
                if (justIdsAgregar.length > 0) {
                    for (const item of justIdsAgregar) {
                        await PermisoRol.create({
                            id_rol,
                            id_permiso: item
                        }, {
                            transaction: t,
                        });
                    }
                }
            }
            await t.commit()
            res
                .status(HttpCode.HTTP_OK)
                .json({ message: "Se ha actualizado con éxito" });
        } catch (e) {
            await t.rollback();
            console.log(e);
            throw e;
        }
    }
    static async delete(req, res) {
        const connection = DB.connection();
        const t = await connection.transaction();
        try {
            const { id_rol } = req.params;
            const existe = await Usuario.findOne({
                where: {
                    id_rol,
                },
            });
            if (!!existe) {
                throw BadRequestException(
                    "No se puede eliminar, existe usuarios que tienen asignado este rol."
                );
            }
            await PermisoRol.destroy({
                transaction:t,
                where:{
                    id_rol
                }
            })
            await Rol.destroy({
                transaction:t,
                where: {
                    id_rol,
                },
            });
            await t.commit()
            res
                .status(HttpCode.HTTP_OK)
                .json({ message: "Se ha eliminado con éxito" });
        } catch (e) {
            await t.rollback();
            console.log(e);
            throw e;
        }
    }
}
