import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import DeduccionPlanillaEmpleadoController from "../../app/Controllers/DeduccionPlanillaEmpleadoController.mjs"
/* import createDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/createSchema.mjs";
import updateDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/updateSchema.mjs";
import deleteDeduccionPlanillaEmpleadoSchema from "../../app/Schemas/DeduccionPlanillaEmpleado/deleteSchema.mjs"; */
const router = Router();
router.post('/', [], Call(DeduccionPlanillaEmpleadoController.store))
router.put('/:id_deduccion_planilla_empleado', [], Call(DeduccionPlanillaEmpleadoController.update))
router.delete('/:id_deduccion_planilla_empleado', [], Call(DeduccionPlanillaEmpleadoController.delete))
export default router;