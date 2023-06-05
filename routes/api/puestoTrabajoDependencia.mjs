import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PuestoTrabajoDependenciaController from "../../app/Controllers/PuestoTrabajoDependenciaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createPuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/createSchema.mjs";
import updatePuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/updateSchema.mjs"
import deletePuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_PUESTO_TRABAJO_DEPENDENCIA') ], Call(PuestoTrabajoDependenciaController.index))
router.post('/',[hasRole('CREATE_PUESTO_TRABAJO_DEPENDENCIA'), validateSchema(createPuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.store))
router.put('/:id_puesto_trabajo_dependencia',[hasRole('UPDATE_PUESTO_TRABAJO_DEPENDENCIA'), validateSchema(updatePuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.update))
router.delete('/:id_puesto_trabajo_dependencia',[hasRole('DESTROY_PUESTO_TRABAJO_DEPENDENCIA'), validateSchema(deletePuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.delete))
export default router;