import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import TipoDependenciaController from '../../app/Controllers/TipoDependenciaController.mjs'
import validateSchema from "../../app/utils/validationResult.mjs";
import createTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/createSchema.mjs";
import updateTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/updateSchema.mjs";
import deleteTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/deleteSchema.mjs";
const router = Router();
router.get('/',Call(TipoDependenciaController.index))
router.post('/',[validateSchema(createTipoDependenciaSchema)],Call(TipoDependenciaController.store))
router.put('/:id_tipo_dependencia',[validateSchema(updateTipoDependenciaSchema)],Call(TipoDependenciaController.update))
router.delete('/:id_tipo_dependencia',[validateSchema(deleteTipoDependenciaSchema)],Call(TipoDependenciaController.delete))
export default router;