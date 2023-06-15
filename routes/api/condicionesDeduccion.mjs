import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import CondicionesDeduccionController from "../../app/Controllers/CondicionesDeduccionController.mjs"
import createCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/createSchema.mjs";
import updateCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/updateSchema.mjs";
import deleteCondicionesDeduccionSchema from "../../app/Schemas/CondicionesDeduccion/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/:id_tipo_deduccion', [hasRole('LIST_CONDICION_DEDUCCION'), ], Call(CondicionesDeduccionController.index))
router.post('/:id_tipo_deduccion', [hasRole('CREATE_CONDICION_DEDUCCION'), validateSchema(createCondicionesDeduccionSchema)], Call(CondicionesDeduccionController.store))
router.put('/:id_condicion_descuento', [hasRole('UPDATE_CONDICION_DEDUCCION'), validateSchema(updateCondicionesDeduccionSchema)], Call(CondicionesDeduccionController.update))
router.delete('/:id_condicion_descuento', [hasRole('DELETE_CONDICION_DEDUCCION'), validateSchema(deleteCondicionesDeduccionSchema)], Call(CondicionesDeduccionController.delete))
export default router;