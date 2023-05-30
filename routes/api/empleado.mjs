import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import EmpleadoController from "../../app/Controllers/EmpleadoController.mjs";
import EmpleadoCreateSchema from "../../app/Schemas/Empleado/createSchema.mjs"
import EmpleadoUdpateSchema from "../../app/Schemas/Empleado/updateSchema.mjs"
import validateSchema from "../../app/utils/validationResult.mjs";
const router = Router();
router.post('/',[validateSchema(EmpleadoCreateSchema)],Call(EmpleadoController.store))
router.put('/:id_empleado',[validateSchema(EmpleadoUdpateSchema)],Call(EmpleadoController.update))
router.get('/',Call(EmpleadoController.index))

export default router;