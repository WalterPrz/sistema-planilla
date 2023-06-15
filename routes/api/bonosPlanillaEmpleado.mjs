import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import BonosPlanillaEmpleadoController from "../../app/Controllers/BonosPlanillaEmpleadoController.mjs"
/* import createBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/createSchema.mjs";
import updateBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/updateSchema.mjs";
import deleteBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/deleteSchema.mjs"; */
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.post('/', [hasRole('CREATE_BONO_PLANILLA')], Call(BonosPlanillaEmpleadoController.store))
router.put('/:id_bonos_planilla_empleado', [hasRole('UPDATE_BONO_PLANILLA')], Call(BonosPlanillaEmpleadoController.update))
router.delete('/:id_bonos_planilla_empleado', [hasRole('DESTROY_BONO_PLANILLA')], Call(BonosPlanillaEmpleadoController.delete))
export default router;