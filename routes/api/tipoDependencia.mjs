import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import TipoDependenciaController from '../../app/Controllers/TipoDependenciaController.mjs'
import validateSchema from "../../app/utils/validationResult.mjs";
import createTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/createSchema.mjs";
import updateTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/updateSchema.mjs";
import deleteTipoDependenciaSchema from "../../app/Schemas/TipoDependencia/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_TIPO_DEPENDENCIA'), ], Call(TipoDependenciaController.index))
router.post('/',[hasRole('CREATE_TIPO_DEPENDENCIA'), validateSchema(createTipoDependenciaSchema)],Call(TipoDependenciaController.store))
router.put('/:id_tipo_dependencia',[hasRole('UPDATE_TIPO_DEPENDENCIA'), validateSchema(updateTipoDependenciaSchema)],Call(TipoDependenciaController.update))
router.delete('/:id_tipo_dependencia',[hasRole('DESTROY_TIPO_DEPENDENCIA'), validateSchema(deleteTipoDependenciaSchema)],Call(TipoDependenciaController.delete))
export default router;