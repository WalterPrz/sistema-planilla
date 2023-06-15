import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PlanillaController from "../../app/Controllers/PlanillaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import creatPlanillaSchema from "../../app/Schemas/Planilla/createSchema.mjs";
import updatePlanillaSchema from "../../app/Schemas/Planilla/updateSchema.mjs";

const router = Router();
router.get('/',Call(PlanillaController.index))
router.post('/',[validateSchema(creatPlanillaSchema)], Call(PlanillaController.store))
router.get('/detalle/:id_planilla',Call(PlanillaController.indexDetalle))
router.get('/detalle_empleado/:id_planilla_empleado',Call(PlanillaController.indexDetalleEmpleado))
router.get('/mis_planillas', Call(PlanillaController.getMyPlanillas))
router.put('/:id_planilla',[validateSchema(updatePlanillaSchema)], Call(PlanillaController.procesarPlanilla))
export default router;