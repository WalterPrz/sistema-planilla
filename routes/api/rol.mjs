import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import RolController from "../../app/Controllers/RolController.mjs"
import createRolSchema from "../../app/Schemas/Rol/createSchema.mjs";
import updateRolSchema from "../../app/Schemas/Rol/updateSchema.mjs";
import deleteRolSchema from "../../app/Schemas/Rol/deleteSchema.mjs";
const router = Router();
router.get('/',Call(RolController.index))
router.post('/',[validateSchema(createRolSchema)],Call(RolController.store))
router.put('/:id_rol',[validateSchema(updateRolSchema)],Call(RolController.update))
router.delete('/:id_rol',[validateSchema(deleteRolSchema)],Call(RolController.delete))
export default router;