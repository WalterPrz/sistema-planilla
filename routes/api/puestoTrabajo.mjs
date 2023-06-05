import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PuestoTrabajoController from '../../app/Controllers/PuestoTrabajoController.mjs'
import validateSchema from "../../app/utils/validationResult.mjs";
import createPuestoTrabajoSchema from "../../app/Schemas/PuestoTrabajo/createSchema.mjs";
import updatePuestoTrabajoSchema from "../../app/Schemas/PuestoTrabajo/updateSchema.mjs";
import deletePuestoTrabajoSchema from "../../app/Schemas/PuestoTrabajo/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_PUESTO_TRABAJO')],Call(PuestoTrabajoController.index))
router.post('/',[hasRole('CREATE_PUESTO_TRABAJO'), validateSchema(createPuestoTrabajoSchema)],Call(PuestoTrabajoController.store))
router.put('/:id_puesto_trabajo',[hasRole('UPDATE_PUESTO_TRABAJO'), validateSchema(updatePuestoTrabajoSchema)],Call(PuestoTrabajoController.update))
router.delete('/:id_puesto_trabajo',[hasRole('DESTROY_PUESTO_TRABAJO'), validateSchema(deletePuestoTrabajoSchema)],Call(PuestoTrabajoController.delete))
export default router;