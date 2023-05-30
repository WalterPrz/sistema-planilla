import { verifyDataExist, callValidateFunc } from "../utils.mjs";
import moment from "moment";
import {
  Empleado,
  PuestoTrabajoDependencia,
  Genero,
  EstadoCivil,
  Municipio,
  Profesion,
  Usuario,
  TipoDocumento,
  Documento,
  DocumentoEmpleado,
} from "../../../app/models/index.mjs";
import Sequelize, { Op } from "sequelize";
const verifyPlazas = async (id_puesto_trabajo_dependencia, req, isUpdate = false) => {
  if(isUpdate){
    const plazasDisponibles = await PuestoTrabajoDependencia.findOne({
      where: {
        id_puesto_trabajo_dependencia,

      },
    });
    const plazasOcupadas = await Empleado.findAll({
      where: {
        id_puesto_trabajo_dependencia,
        id_empleado: {[Op.ne]: req.params.id_empleado}
      },
    });
    if (plazasDisponibles.plazas == plazasOcupadas.length) {
      throw new Error("Ya no hay plazas disponibles para este puesto.");
    } else {
      return true;
    }
  }else{
    const plazasDisponibles = await PuestoTrabajoDependencia.findOne({
      where: {
        id_puesto_trabajo_dependencia,
      },
    });
    const plazasOcupadas = await Empleado.findAll({
      where: {
        id_puesto_trabajo_dependencia,
      },
    });
    if (plazasDisponibles.plazas == plazasOcupadas.length) {
      throw new Error("Ya no hay plazas disponibles para este puesto.");
    } else {
      return true;
    }
  }
};
const verifyDecimals = (value) => {
  const valid = /^\d+(\.\d{2})?$/.test(value);
  if (!valid) {
    throw new Error("Solo se permite dos decimales");
  } else {
    return true;
  }
};
const validateIdPuestoTrabajoDependenciaCreate = async (value, { req }) => {
  try {
    await verifyDataExist(
      value,
      req,
      "id_puesto_trabajo_dependencia",
      PuestoTrabajoDependencia
    );
    await verifyPlazas(value);
  } catch (e) {
    throw e;
  }
};
const verifyIsOld = (value, { req }) => {
  const fechaActual = moment();
  const edad = fechaActual.diff(value, "years", true);
  if (edad < 18) {
    throw new Error("La persona es menor de 18 años.");
  } else {
    return true;
  }
};
const verifySalarioInRange = async (value, req) => {
  const infoPuesto = await PuestoTrabajoDependencia.findOne({
    where: {
      id_puesto_trabajo_dependencia: req.body.id_puesto_trabajo_dependencia,
    },
  });
  if (value < infoPuesto.salario_minimo || value > infoPuesto.salario_maximo) {
    throw new Error(
      `El salario debe estar en el rango: $ ${infoPuesto.salario_minimo} - $ ${infoPuesto.salario_maximo}`
    );
  }
};
const validateSalarioCreate = async (value, { req }) => {
  try {
    verifyDecimals(value);
    await verifySalarioInRange(value, req);
  } catch (e) {
    throw e;
  }
};
const setOnlyByTipo = async (value, { req }) => {
  try {
    const arrayDocusLimpios = [];
    const tipos = await TipoDocumento.findAll({
      include: { model: Documento },
    });
    const documentos = await Documento.findAll();
    for (const item of tipos) {
      const mismoTipo = documentos.map((doc) => {
        if (doc.id_tipo_documento == item.id_tipo_documento) {
          return doc.id_documento;
        }
      });
      const primeroDoc = value.find((doc) =>
        mismoTipo.includes(doc.id_documento)
      );
      if (!!primeroDoc) {
        if (
          !!!primeroDoc?.numero_documento_empleado ||
          primeroDoc.numero_documento_empleado == ""
        ) {
          throw new Error(
            `Debes ingresar un número de documento para el tipo: ${primeroDoc.id_documento}`
          );
        }
        arrayDocusLimpios.push(primeroDoc);
      } else {
        throw new Error(`Falta documento de: ${item.nombre_tipo_documento}`);
      }
    }
    return arrayDocusLimpios
  } catch (e) {
    throw e;
  }
};
const validateArrayDocumentos = async (value, { req }) => {
  try {
    for (const nuevoDoc of value) {
      const buscado = await DocumentoEmpleado.findOne({
        include: [
          {
            required: true,
            model: Documento,
          },
        ],
        where: {
          numero_documento_empleado: nuevoDoc.numero_documento_empleado,
          id_documento: nuevoDoc.id_documento,
        },
      });
      if (!!buscado) {
        throw new Error(
          `Ya existe un documento registrado con el número: ${nuevoDoc.numero_documento_empleado}`
        );
      }
    }
  } catch (e) {
    throw e;
  }
};
const validateIdPuestoTrabajoDependenciaUpdate = async (value, { req }) => {
  try {
    await verifyDataExist(
      value,
      req,
      "id_puesto_trabajo_dependencia",
      PuestoTrabajoDependencia
    );
    await verifyPlazas(value, req, true);
  } catch (e) {
    throw e;
  }
};
const validateArrayDocumentosUpdate = async (value, { req }) => {
  try {
    for (const nuevoDoc of value) {
      const buscado = await DocumentoEmpleado.findOne({
        include: [
          {
            required: true,
            model: Documento,
          },
        ],
        where: {
          numero_documento_empleado: nuevoDoc.numero_documento_empleado,
          id_documento: nuevoDoc.id_documento,
          id_empleado: {[Op.ne]:req.params.id_empleado}
        },
      });
      if (!!buscado) {
        throw new Error(
          `Ya existe un documento registrado con el número: ${nuevoDoc.numero_documento_empleado}`
        );
      }
    }
  } catch (e) {
    throw e;
  }
};
export {
  validateIdPuestoTrabajoDependenciaCreate,
  validateIdPuestoTrabajoDependenciaUpdate,
  verifyIsOld,
  validateSalarioCreate,
  validateArrayDocumentos,
  setOnlyByTipo,
  validateArrayDocumentosUpdate,
};
