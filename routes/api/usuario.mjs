import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import UsuarioController from "../../app/Controllers/UsuarioController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import {validateToken} from "../../app/middlewares/AuthMiddlewares.mjs";
import usuarioCreateSchema from "../../app/Schemas/Usuario/createSchema.mjs";
import usuarioUpdateSchema from "../../app/Schemas/Usuario/updateSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();

router.post('/',[hasRole('CREATE_USER'), validateSchema(usuarioCreateSchema)],Call(UsuarioController.store))
router.put('/:id_usuario',[hasRole('UPDATE_USER'), validateSchema(usuarioUpdateSchema)],Call(UsuarioController.updateUser))
router.put('/status/:id_usuario',[hasRole('CHANGE_STATUS_USER')], Call(UsuarioController.setStatus))
router.get('/',[hasRole('LIST_USER')], Call(UsuarioController.index))

export default router;