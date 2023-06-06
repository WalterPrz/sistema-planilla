import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import CondicionesDeduccionController from "../../app/Controllers/CondicionesDeduccionController.mjs"
/* import createCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/createSchema.mjs";
import updateCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/updateSchema.mjs";
import deleteCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/deleteSchema.mjs"; */
const router = Router();
router.get('/:id_tipo_deduccion',[] ,Call(CondicionesDeduccionController.index))
router.post('/:id_tipo_deduccion', [], Call(CondicionesDeduccionController.store))
router.put('/:id_condicion_descuento', [], Call(CondicionesDeduccionController.update))
router.delete('/:id_condicion_descuento', [], Call(CondicionesDeduccionController.delete))
export default router;