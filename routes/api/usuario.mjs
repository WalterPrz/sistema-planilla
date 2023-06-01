import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import UsuarioController from "../../app/Controllers/UsuarioController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import {validateToken} from "../../app/middlewares/AuthMiddlewares.mjs";
import usuarioCreateSchema from "../../app/Schemas/Usuario/createSchema.mjs";
import usuarioUpdateSchema from "../../app/Schemas/Usuario/updateSchema.mjs";
const router = Router();

router.post('/',[validateSchema(usuarioCreateSchema)],Call(UsuarioController.store))
router.put('/:id_usuario',[validateSchema(usuarioUpdateSchema)],Call(UsuarioController.updateUser))
router.put('/status/:id_usuario',Call(UsuarioController.setStatus))
router.get('/',Call(UsuarioController.index))

export default router;