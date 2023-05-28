import { Router } from "express";
import authRouter from './api/auth.mjs'
import puestoTrabajoRouter from './api/puestoTrabajo.mjs'
import tipoDependenciaRouter from './api/tipoDependencia.mjs'
import dependenciaRouter from './api/dependencia.mjs'
import puestoTrabajoDependenciaRouter from './api/puestoTrabajoDependencia.mjs'
import rolRouter from './api/rol.mjs'
import permisoRouter from './api/permiso.mjs'
import empresaRouter from './api/empresa.mjs'
import centroCostoRouter from './api/centroCosto.mjs'
import deduccionesRouter from './api/deducciones.mjs';
import { validateToken } from "../app/middlewares/AuthMiddlewares.mjs";

const router = Router();

router.use('/auth', authRouter)
router.use('/puesto_trabajo', [validateToken], puestoTrabajoRouter)
router.use('/tipo_dependencia', [validateToken], tipoDependenciaRouter)
router.use('/dependencia', [validateToken], dependenciaRouter)
router.use('/puesto_dependencia', [validateToken], puestoTrabajoDependenciaRouter)
router.use('/permiso', [validateToken], permisoRouter)
router.use('/rol', [validateToken], rolRouter)
router.use('/empresa', [validateToken], empresaRouter)
router.use('/centro_costo', [validateToken], centroCostoRouter)
router.use('/deducciones', [validateToken], deduccionesRouter);

export default router;