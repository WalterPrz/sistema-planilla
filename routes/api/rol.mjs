import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import RolController from "../../app/Controllers/RolController.mjs"
import createRolSchema from "../../app/Schemas/Rol/createSchema.mjs";
import updateRolSchema from "../../app/Schemas/Rol/updateSchema.mjs";
import deleteRolSchema from "../../app/Schemas/Rol/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole("LIST_ROLS")],Call(RolController.index))
router.post('/',[hasRole("CREATE_ROL"),validateSchema(createRolSchema)],Call(RolController.store))
router.put('/:id_rol',[hasRole("UPDATE_ROL"),validateSchema(updateRolSchema)],Call(RolController.update))
router.delete('/:id_rol',[hasRole("DESTROY_ROL"),validateSchema(deleteRolSchema)],Call(RolController.delete))
export default router;