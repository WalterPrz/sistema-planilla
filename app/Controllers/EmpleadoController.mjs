import {
  Empleado,
  PuestoTrabajoDependencia,
  Genero,
  EstadoCivil,
  Municipio,
  Profesion,
  Usuario,
  TipoDocumento,
  DocumentoEmpleado,
  Documento,
  PuestoTrabajo,
  Dependencia,
  TipoDependencia,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import Sequelize, { Op } from "sequelize";
import DB from "../DB/connection.mjs";
import BadRequestException from "../../handlers/BadRequestException.mjs";

export default class EmpleadoController {
  static async store(req, res) {
    const connection = DB.connection();
    const t = await connection.transaction();
    try {
      const {
        id_puesto_trabajo_dependencia,
        id_genero,
        id_estado_civil,
        id_municipio,
        id_profesion,
        array_documentos,
        apellido_casada,
        barrio_colonia_residencial,
        calle_avenida,
        fecha_de_nacimiento,
        id_empleado_jefe,
        numero_casa_apto,
        pasaje_senda,
        primer_apellido,
        primer_nombre,
        salario,
        segundo_apellido,
        segundo_nombre,
      } = req.body;
      const empleado = await Empleado.create(
        {
          id_genero,
          id_profesion,
          id_estado_civil,
          id_municipio,
          id_puesto_trabajo_dependencia,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          apellido_casada,
          fecha_de_nacimiento,
          numero_casa_apto,
          salario,
          id_empleado_jefe,
          barrio_colonia_residencial,
          pasaje_senda,
          calle_avenida,
          fecha_inicio: new Date(),
        },
        { transaction: t }
      );
      for (const item of array_documentos) {
        await DocumentoEmpleado.create(
          {
            id_documento: item.id_documento,
            id_empleado: empleado.id_empleado,
            numero_documento_empleado: item.numero_documento_empleado,
          },
          { transaction: t }
        );
      }

      await t.commit();
      return res
        .status(HttpCode.HTTP_CREATED)
        .json({ message: "Ha sido creado con éxito", empleado });
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  static async index(req, res) {
    const empleadosNoLimpios = await Empleado.findAll({
      include: [
        {
          required: true,
          model: PuestoTrabajoDependencia,
          include: [
            {
              required: true,
              model: PuestoTrabajo,
            },
            {
              required: true,
              model: Dependencia,
            },
          ],
        },
        {
          required: true,
          model: Genero,
        },
        {
          required: true,
          model: EstadoCivil,
        },
        {
          required: true,
          model: Municipio,
        },
        {
          required: true,
          model: Profesion,
        },
        {
          required: true,
          model: DocumentoEmpleado,
          include: [
            {
              required: true,
              model: Documento,
              include: {
                required: true,
                model: TipoDocumento,
              },
            },
          ],
        },
      ],
    });
    const empleadosLimpios = [];
    for (const item of empleadosNoLimpios) {
      const documentos = item.DocumentoEmpleados.map((doc) => {
        return {
          id_documento_empleado: doc.id_documento_empleado,
          id_documento: doc.id_documento,
          numero_documento_empleado: doc.numero_documento_empleado,
          nombre_documento: doc.Documento.nombre_documento,
          id_tipo_documento: doc.Documento.id_tipo_documento,
          nombre_tipo_document:
            doc.Documento.TipoDocumento.nombre_tipo_document,
        };
      });
      const infoDependencia = await Dependencia.findOne({
        include: [
          {
            model: TipoDependencia,
          },
        ],
        where: {
          id_dependencia: item.PuestoTrabajoDependencium.id_dependencia,
        },
      });
      const infoEmpleado = await EmpleadoController.infoJefe(
        item.id_empleado_jefe
      );
      const nombre_dependencia = `${infoDependencia.TipoDependencium.nombre_tipo_dependencia} ${infoDependencia.nombre_dependencia}`;
      empleadosLimpios.push({
        id_empleado: item.id_empleado,
        id_genero: item.id_genero,
        id_profesion: item.id_profesion,
        id_estado_civil: item.id_estado_civil,
        id_municipio: item.id_municipio,
        id_puesto_trabajo_dependencia: item.id_puesto_trabajo_dependencia,
        primer_nombre: item.primer_nombre,
        segundo_nombre: item.segundo_nombre,
        primer_apellido: item.primer_apellido,
        segundo_apellido: item.segundo_apellido,
        apellido_casada: item.apellido_casada,
        fecha_de_nacimiento: item.fecha_de_nacimiento,
        numero_casa_apto: item.numero_casa_apto,
        salario: item.salario,
        id_empleado_jefe: infoEmpleado,
        barrio_colonia_residencial: item.barrio_colonia_residencial,
        pasaje_senda: item.pasaje_senda,
        calle_avenida: item.calle_avenida,
        id_dependencia: item.PuestoTrabajoDependencium.id_dependencia,
        salario_maximo: item.PuestoTrabajoDependencium.salario_maximo,
        salario_minimo: item.PuestoTrabajoDependencium.salario_minimo,
        plazas: item.PuestoTrabajoDependencium.plazas,
        jefatura: item.PuestoTrabajoDependencium.jefatura,
        id_puesto_trabajo: item.PuestoTrabajoDependencium.id_puesto_trabajo,
        nombre_puesto_trabajo:
          item.PuestoTrabajoDependencium.PuestoTrabajo.nombre_puesto_trabajo,
        nombre_dependencia,
        nombre_genero: item.Genero.nombre_genero,
        nombre_estado_civil: item.EstadoCivil.nombre_estado_civil,
        nombre_municipio: item.Municipio.nombre_municipio,
        nombre_profesion: item.Profesion.nombre_profesion,
        fecha_inicio: item.fecha_inicio,
        fecha_fin: item.fecha_fin,
        documentos,
      });
    }
    return res.status(HttpCode.HTTP_OK).json(empleadosLimpios);
  }
  static async update(req, res) {
    const connection = DB.connection();
    const t = await connection.transaction();
    try {
      const {
        id_puesto_trabajo_dependencia,
        id_genero,
        id_estado_civil,
        id_municipio,
        id_profesion,
        array_documentos,
        apellido_casada,
        barrio_colonia_residencial,
        calle_avenida,
        fecha_de_nacimiento,
        id_empleado_jefe,
        numero_casa_apto,
        pasaje_senda,
        primer_apellido,
        primer_nombre,
        salario,
        segundo_apellido,
        segundo_nombre,
        documentos_change,
      } = req.body;
      const { id_empleado } = req.params;
      await Empleado.update(
        {
          id_genero,
          id_profesion,
          id_estado_civil,
          id_municipio,
          id_puesto_trabajo_dependencia,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          apellido_casada,
          fecha_de_nacimiento,
          numero_casa_apto,
          salario,
          id_empleado_jefe,
          barrio_colonia_residencial,
          pasaje_senda,
          calle_avenida,
          fecha_inicio: new Date(),
        },
        {
          where: {
            id_empleado,
          },
          transaction: t,
        }
      );
      if (!!documentos_change) {
        await DocumentoEmpleado.destroy({
          where: {
            id_empleado,
          },
          transaction: t,
        });
        for (const item of array_documentos) {
          await DocumentoEmpleado.create(
            {
              id_documento: item.id_documento,
              id_empleado,
              numero_documento_empleado: item.numero_documento_empleado,
            },
            { transaction: t }
          );
        }
      }
      await t.commit();
      return res
        .status(HttpCode.HTTP_OK)
        .json({ message: "Ha sido actualizado con éxito" });
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  static async infoJefe(id_empleado) {
    if (id_empleado == null) {
      return null;
    }
    const empleadosNoLimpios = await Empleado.findOne({
      include: [
        {
          required: true,
          model: PuestoTrabajoDependencia,
          include: [
            {
              required: true,
              model: PuestoTrabajo,
            },
            {
              required: true,
              model: Dependencia,
            },
          ],
        },
      ],
      where: {
        id_empleado,
      },
    });
    if (empleadosNoLimpios == null) {
      return null;
    }
    const infoDependencia = await Dependencia.findOne({
      include: [
        {
          model: TipoDependencia,
        },
      ],
      where: {
        id_dependencia:
          empleadosNoLimpios.PuestoTrabajoDependencium.id_dependencia,
      },
    });
    const nombre_dependencia = `${infoDependencia.TipoDependencium.nombre_tipo_dependencia} ${infoDependencia.nombre_dependencia}`;
    const empleadoLimpio = {
      id_empleado: empleadosNoLimpios.id_empleado,
      id_puesto_trabajo_dependencia:
        empleadosNoLimpios.id_puesto_trabajo_dependencia,
      primer_nombre: empleadosNoLimpios.primer_nombre,
      segundo_nombre: empleadosNoLimpios.segundo_nombre,
      primer_apellido: empleadosNoLimpios.primer_apellido,
      segundo_apellido: empleadosNoLimpios.segundo_apellido,
      apellido_casada: empleadosNoLimpios.apellido_casada,
      fecha_de_nacimiento: empleadosNoLimpios.fecha_de_nacimiento,
      fecha_inicio: empleadosNoLimpios.fecha_inicio,
      fecha_fin: empleadosNoLimpios.fecha_fin,
      id_puesto_trabajo:
        empleadosNoLimpios.PuestoTrabajoDependencium.id_puesto_trabajo,
      nombre_puesto_trabajo:
        empleadosNoLimpios.PuestoTrabajoDependencium.PuestoTrabajo
          .nombre_puesto_trabajo,
      nombre_dependencia,
    };
    return empleadoLimpio;
  }
  static async downEmpleado(req, res) {
    try {
      const { id_empleado } = req.params;
      await Empleado.update({
        fecha_fin: new Date()
      },{where:{id_empleado}})
      return res
        .status(HttpCode.HTTP_OK)
        .json({ message: "Ha sido creado con éxito", empleado });
    } catch (e) {
      throw e;
    }
  }
}
