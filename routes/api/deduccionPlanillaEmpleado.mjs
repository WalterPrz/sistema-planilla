import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import DeduccionPlanillaEmpleadoController from "../../app/Controllers/DeduccionPlanillaEmpleadoController.mjs"
/* import createDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/createSchema.mjs";
import updateDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/updateSchema.mjs";
import deleteDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/deleteSchema.mjs"; */
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.post('/', [hasRole('CREATE_DEDUCCION_PLANILLA')], Call(DeduccionPlanillaEmpleadoController.store))
router.put('/:id_deduccion_planilla_empleado', [hasRole('UPDATE_DEDUCCION_PLANILLA')], Call(DeduccionPlanillaEmpleadoController.update))
router.delete('/:id_deduccion_planilla_empleado', [hasRole('DESTROY_DEDUCCION_PLANILLA')], Call(DeduccionPlanillaEmpleadoController.delete))
export default router;