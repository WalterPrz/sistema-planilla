import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PlanillaController from "../../app/Controllers/PlanillaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import creatPlanillaSchema from "../../app/Schemas/Planilla/createSchema.mjs";
import updatePlanillaSchema from "../../app/Schemas/Planilla/updateSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_PLANILLA'), ],Call(PlanillaController.index))
router.post('/',[hasRole('CREATE_PLANILLA'), validateSchema(creatPlanillaSchema)], Call(PlanillaController.store))
router.get('/detalle/:id_planilla',[hasRole('LIST_DETALLE_PLANILLA') ], Call(PlanillaController.indexDetalle))
router.get('/detalle_empleado/:id_planilla_empleado',[hasRole('LIST_EMPLEADO_DETALLE_PLANILLA') ], Call(PlanillaController.indexDetalleEmpleado))
router.get('/mis_planillas', Call(PlanillaController.getMyPlanillas))
router.put('/:id_planilla',[hasRole('UPDATE_PLANILLA'), validateSchema(updatePlanillaSchema)], Call(PlanillaController.procesarPlanilla))
export default router;