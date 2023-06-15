import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import PermisoController from "../../app/Controllers/PermisoController.mjs"
import createPermisoSchema from "../../app/Schemas/Permiso/createSchema.mjs";
import updatePermisoSchema from "../../app/Schemas/Permiso/updateSchema.mjs";
import deletePermisoSchema from "../../app/Schemas/Permiso/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_PERMISO')],Call(PermisoController.index))
router.post('/',[hasRole('CREATE_PERMISO'), validateSchema(createPermisoSchema)],Call(PermisoController.store))
router.put('/:id_permiso',[hasRole('UPDATE_PERMISO'), validateSchema(updatePermisoSchema)],Call(PermisoController.update))
router.delete('/:id_permiso',[hasRole('DELETE_PERMISO'), validateSchema(deletePermisoSchema)],Call(PermisoController.delete))
export default router;