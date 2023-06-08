import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import TipoDeduccionController from "../../app/Controllers/TipoDeduccionController.mjs"
import createTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/createSchema.mjs";
import updateTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/updateSchema.mjs";
import deleteTipoDeduccionSchema from "../../app/Schemas/TipoDeduccion/deleteSchema.mjs";
const router = Router();
router.get('/',[], Call(TipoDeduccionController.index))
router.post('/', [validateSchema(createTipoDeduccionSchema)], Call(TipoDeduccionController.store))
router.put('/:id_deduccion', [validateSchema(updateTipoDeduccionSchema)], Call(TipoDeduccionController.update))
router.delete('/:id_deduccion', [validateSchema(deleteTipoDeduccionSchema)], Call(TipoDeduccionController.delete))
export default router;