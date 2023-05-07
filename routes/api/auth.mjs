import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import AuthController from "../../app/Controllers/AuthController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import LoginSchema from '../../app/Schemas/LoginSchema.mjs'
import {validateToken} from "../../app/middlewares/AuthMiddlewares.mjs";
import RegisterSchema from "../../app/Schemas/RegisterSchema.mjs";
const router = Router();
router.post('/login',[validateSchema(LoginSchema)],Call(AuthController.login))
router.post('/logout',[validateToken],Call(AuthController.logout))
router.post('/register',[validateToken, validateSchema(RegisterSchema)],Call(AuthController.register))
export default router;