import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import DependenciaController from "../../app/Controllers/DependenciaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createDependenciaSchema from "../../app/Schemas/Dependencia/createSchema.mjs";
import updateDependenciaSchema from "../../app/Schemas/Dependencia/updateSchema.mjs"
import deleteDependenciaSchema from "../../app/Schemas/Dependencia/deleteSchema.mjs";
const router = Router();
router.get('/',Call(DependenciaController.index))
router.post('/',[validateSchema(createDependenciaSchema)],Call(DependenciaController.store))
router.put('/:id_dependencia',[validateSchema(updateDependenciaSchema)],Call(DependenciaController.update))
router.delete('/:id_dependencia',[validateSchema(deleteDependenciaSchema)],Call(DependenciaController.delete))
export default router;