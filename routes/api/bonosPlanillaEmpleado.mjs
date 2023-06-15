import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import BonosPlanillaEmpleadoController from "../../app/Controllers/BonosPlanillaEmpleadoController.mjs"
/* import createBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/createSchema.mjs";
import updateBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/updateSchema.mjs";
import deleteBonosPlanillaEmpleadoSchema from "../../app/Schemas/BonosPlanillaEmpleado/deleteSchema.mjs"; */
const router = Router();
router.post('/', [], Call(BonosPlanillaEmpleadoController.store))
router.put('/:id_bonos_planilla_empleado', [], Call(BonosPlanillaEmpleadoController.update))
router.delete('/:id_bonos_planilla_empleado', [], Call(BonosPlanillaEmpleadoController.delete))
export default router;