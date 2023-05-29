import EstructuraTerritorial from "./EstructuraTerritorial.mjs";
import Departamento from "./Departamento.mjs";
import Municipio from "./Municipio.mjs";
import EstadoCivil from "./EstadoCivil.mjs";
import Genero from "./Genero.mjs";
import Profesion from "./Profesion.mjs";
import TipoDependencia from "./TipoDependencia.mjs";
import Dependencia from "./Dependencia.mjs";
import CentroCosto from "./CentroCosto.mjs";
import Empresa from "./Empresa.mjs";
import PuestoTrabajo from "./PuestoTrabajo.mjs";
import TipoDocumento from "./TipoDocumento.mjs";
import PuestoTrabajoDependencia from "./PuestoTrabajoDependencia.mjs";
import DocumentoEmpleado from "./DocumentoEmpleado.mjs";
import Usuario from "./Usuario.mjs";
import Empleado from "./Empleado.mjs";
import RefreshToken from "./RefreshToken.mjs";
import Permiso from "./Permiso.mjs";
import TipoRol from "./TipoRol.mjs";
import Rol from "./Rol.mjs";
import PermisoRol from "./PermisoRol.mjs";
import CondicionDeduccion from "./CondicionDeduccion.mjs";
import PlanillaEmpleado from "./PlanillaEmpleado.mjs";
import DeduccionPlanillaDetalle from "./DeduccionPlanillaDetalle.mjs";
import TipoDeduccion from "./TipoDeduccion.mjs";
EstructuraTerritorial.associate();
Departamento.associate();
Municipio.associate();
EstadoCivil.associate();
Genero.associate();
Profesion.associate();
TipoDependencia.associate();
Dependencia.associate();
CentroCosto.associate();
Empresa.associate();
PuestoTrabajo.associate();
TipoDocumento.associate();
PuestoTrabajoDependencia.associate();
DocumentoEmpleado.associate();
Usuario.associate();
Empleado.associate();
RefreshToken.associate();
Permiso.associate();
TipoRol.associate();
Rol.associate();
PermisoRol.associate();
CondicionDeduccion.associate();
DeduccionPlanillaDetalle.associate();
export {
    TipoDeduccion,
    EstructuraTerritorial,
    Departamento,
    Municipio,
    EstadoCivil,
    Genero,
    Profesion,
    TipoDependencia,
    Dependencia,
    CentroCosto,
    Empresa,
    PuestoTrabajo,
    TipoDocumento,
    PuestoTrabajoDependencia,
    DocumentoEmpleado,
    Usuario,
    Empleado,
    RefreshToken,
    Permiso,
    TipoRol,
    Rol,
    PermisoRol,
    CondicionDeduccion,
    PlanillaEmpleado,
    DeduccionPlanillaDetalle,
};