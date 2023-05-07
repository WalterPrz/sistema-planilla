import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PuestoTrabajoController from '../../app/Controllers/PuestoTrabajoController.mjs'
import validateSchema from "../../app/utils/validationResult.mjs";
import createPuestoTrabajoSchema from "../../app/Schemas/PuestoTrabajo/createSchema.mjs";
import updatePuestoTrabajoSchema from "../../app/Schemas/PuestoTrabajo/updateSchema.mjs";
const router = Router();
router.get('/',Call(PuestoTrabajoController.index))
router.post('/',[validateSchema(createPuestoTrabajoSchema)],Call(PuestoTrabajoController.store))
router.put('/:id_puesto_trabajo',[validateSchema(updatePuestoTrabajoSchema)],Call(PuestoTrabajoController.update))
router.delete('/:id_puesto_trabajo',Call(PuestoTrabajoController.delete))
export default router;