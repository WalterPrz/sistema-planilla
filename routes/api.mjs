import { Router } from "express";
import authRouter from './api/auth.mjs'
import puestoTrabajoRouter from './api/puestoTrabajo.mjs'
import tipoDependenciaRouter  from './api/tipoDependencia.mjs'
import dependenciaRouter from './api/dependencia.mjs'
import puestoTrabajoDependenciaRouter from './api/puestoTrabajoDependencia.mjs'
import rolRouter from './api/rol.mjs'
import permisoRouter from './api/permiso.mjs'
import empresaRouter from './api/empresa.mjs'
import centroCostoRouter from './api/centroCosto.mjs'
import catalogoRouter from './api/catalogo.mjs'
import empleadoRouter from './api/empleado.mjs'
import usuarioRouter from './api/usuario.mjs'
import planillaRouter from './api/planilla.mjs'
import tipoBonoRouter from './api/tipoBono.mjs'
import tipoDeduccionRouter from './api/tipoDeduccion.mjs'
import condicionesDeduccionRouter from './api/condicionesDeduccion.mjs'
import {validateToken} from "../app/middlewares/AuthMiddlewares.mjs";
import { validationResult } from "express-validator";

const router = Router();

router.use('/auth',authRouter)
router.use('/puesto_trabajo',[validateToken],puestoTrabajoRouter)
router.use('/tipo_dependencia',[validateToken],tipoDependenciaRouter)
router.use('/dependencia',[validateToken], dependenciaRouter)
router.use('/puesto_dependencia',[validateToken], puestoTrabajoDependenciaRouter)
router.use('/permiso',[validateToken], permisoRouter)
router.use('/rol',[validateToken], rolRouter)
router.use('/empresa',[validateToken], empresaRouter)
router.use('/centro_costo',[validateToken], centroCostoRouter)
router.use('/catalogo', [validateToken], catalogoRouter)
router.use('/empleado', [validateToken],empleadoRouter)
router.use('/usuario',[validateToken], usuarioRouter)
router.use('/planilla', planillaRouter)
router.use('/tipo_bono', tipoBonoRouter)
router.use('/tipo_deduccion', tipoDeduccionRouter)
router.use('/condiciones_deduccion', condicionesDeduccionRouter)

export default router;