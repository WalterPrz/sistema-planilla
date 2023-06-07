import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import DeduccionEmpleadoController from "../../app/Controllers/DeduccionEmpleadoController.mjs"
/* import createDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/createSchema.mjs";
import updateDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/updateSchema.mjs";
import deleteDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/deleteSchema.mjs"; */
const router = Router();
router.get('/:id_empleado',[],Call(DeduccionEmpleadoController.index))
router.post('/', [], Call(DeduccionEmpleadoController.store))
router.put('/:id_deduccion_empleado', [], Call(DeduccionEmpleadoController.update))

export default router;