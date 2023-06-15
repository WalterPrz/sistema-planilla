import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import DeduccionEmpleadoController from "../../app/Controllers/DeduccionEmpleadoController.mjs"
/* import createDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/createSchema.mjs";
import updateDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/updateSchema.mjs";
import deleteDeduccionEmpleadoSchema from "../../app/Schemas/DeduccionEmpleado/deleteSchema.mjs"; */
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/:id_empleado',[hasRole('LIST_DEDUCCION_EMPLEADO')],Call(DeduccionEmpleadoController.index))
router.post('/', [hasRole('CREATE_DEDUCCION_EMPLEADO')], Call(DeduccionEmpleadoController.store))
router.put('/:id_deduccion_empleado', [hasRole('UPDATE_DEDUCCION_EMPLEADO')], Call(DeduccionEmpleadoController.update))

export default router;