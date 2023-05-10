import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PuestoTrabajoDependenciaController from "../../app/Controllers/PuestoTrabajoDependenciaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createPuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/createSchema.mjs";
// import updatePuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/updateSchema.mjs"
// import deletePuestoTrabajoDependenciaSchema from "../../app/Schemas/PuestoTrabajoDependencia/deleteSchema.mjs";
const router = Router();
router.get('/',Call(PuestoTrabajoDependenciaController.index))
router.post('/',[validateSchema(createPuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.store))
//router.put('/:id_puesto_trabajo_dependencia',[validateSchema(updatePuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.update))
//router.delete('/:id_puesto_trabajo_dependencia',[validateSchema(deletePuestoTrabajoDependenciaSchema)],Call(PuestoTrabajoDependenciaController.delete))
export default router;