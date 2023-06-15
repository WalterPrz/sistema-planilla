import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import DependenciaController from "../../app/Controllers/DependenciaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createDependenciaSchema from "../../app/Schemas/Dependencia/createSchema.mjs";
import updateDependenciaSchema from "../../app/Schemas/Dependencia/updateSchema.mjs"
import deleteDependenciaSchema from "../../app/Schemas/Dependencia/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_DEPENDENCIA') ],Call(DependenciaController.index))
router.post('/',[hasRole('CREATE_DEPENDENCIA'), validateSchema(createDependenciaSchema)],Call(DependenciaController.store))
router.put('/:id_dependencia',[hasRole('UPDATE_DEPENDENCIA'), validateSchema(updateDependenciaSchema)],Call(DependenciaController.update))
router.delete('/:id_dependencia',[hasRole('DESTROY_DEPENDENCIA'), validateSchema(deleteDependenciaSchema)],Call(DependenciaController.delete))
export default router;