import { Router } from "express";
import authRouter from './api/auth.mjs'
import puestoTrabajoRouter from './api/puestoTrabajo.mjs'
import tipoDependenciaRouter  from './api/tipoDependencia.mjs'
import dependenciaRouter from './api/dependencia.mjs'
import puestoTrabajoDependenciaRouter from './api/puestoTrabajoDependencia.mjs'
import {validateToken} from "../app/middlewares/AuthMiddlewares.mjs";
const router = Router();

router.use('/auth',authRouter)
router.use('/puesto_trabajo',[validateToken],puestoTrabajoRouter)
router.use('/tipo_dependencia',[validateToken],tipoDependenciaRouter)
router.use('/puesto_dependencia',[validateToken], puestoTrabajoDependenciaRouter)
export default router;