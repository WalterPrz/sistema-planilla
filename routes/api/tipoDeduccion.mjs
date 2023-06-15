import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import TipoDeduccionController from "../../app/Controllers/TipoDeduccionController.mjs"
import createTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/createSchema.mjs";
import updateTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/updateSchema.mjs";
import deleteTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_TIPO_DEDUCCION')], Call(TipoDeduccionController.index))
router.post('/', [hasRole('CREATE_TIPO_DEDUCCION'), validateSchema(createTipoDeduccionSchema)], Call(TipoDeduccionController.store))
router.put('/:id_deduccion', [hasRole('UPDATE_TIPO_DEDUCCION'), validateSchema(updateTipoDeduccionSchema)], Call(TipoDeduccionController.update))
router.delete('/:id_deduccion', [hasRole('DESTROY_TIPO_DEDUCCION'), validateSchema(deleteTipoDeduccionSchema)], Call(TipoDeduccionController.delete))
export default router;