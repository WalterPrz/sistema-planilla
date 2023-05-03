import { Router } from "express";
import pruebaRouter from './api/prueba.mjs'
import AuthController from "../app/Controllers/AuthController.mjs";
import Call from "../app/utils/Call.mjs";
import {validateToken} from "../app/middlewares/AuthMiddlewares.mjs";
import validateSchema from "../app/utils/validationResult.mjs";
import RegisterSchema from "../app/Schemas/RegisterSchema.mjs";
const router = Router();
router.post('/register',[validateToken, validateSchema(RegisterSchema)],Call(AuthController.register))
router.post('/login',Call(AuthController.login))
router.post('/logout',[validateToken],Call(AuthController.logout))
router.use('/prueba',pruebaRouter)
export default router;