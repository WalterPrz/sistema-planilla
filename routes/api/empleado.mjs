import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import EmpleadoController from "../../app/Controllers/EmpleadoController.mjs";
import EmpleadoCreateSchema from "../../app/Schemas/Empleado/createSchema.mjs"
import EmpleadoUdpateSchema from "../../app/Schemas/Empleado/updateSchema.mjs"
import validateSchema from "../../app/utils/validationResult.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.post('/',[hasRole('CREATE_EMPLEADO'), validateSchema(EmpleadoCreateSchema)],Call(EmpleadoController.store))
router.put('/:id_empleado',[hasRole('UPDATE_EMPLEADO'), validateSchema(EmpleadoUdpateSchema)],Call(EmpleadoController.update))
router.get('/',[hasRole('LIST_EMPLEADO'), ],Call(EmpleadoController.index))
router.put('/down/:id_empleado',[hasRole('DOWN_EMPLEADO'), ],Call(EmpleadoController.downEmpleado))

export default router;