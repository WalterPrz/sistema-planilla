import { Router } from "express";
import authRouter from './api/auth.mjs'
import puestoTrabajoRouter from './api/puestoTrabajo.mjs'
import {validateToken} from "../app/middlewares/AuthMiddlewares.mjs";
const router = Router();

router.use('/auth',authRouter)
router.use('/puesto_trabajo',[validateToken],puestoTrabajoRouter)
export default router;