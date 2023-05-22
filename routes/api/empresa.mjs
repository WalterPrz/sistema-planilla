import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import EmpresaController from "../../app/Controllers/EmpresaController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createEmpresaSchema from "../../app/Schemas/Empresa/createSchema.mjs";
import updateEmpresaSchema from "../../app/Schemas/Empresa/updateSchema.mjs"

const router = Router();
router.get('/',Call(EmpresaController.index))
router.post('/',[validateSchema(createEmpresaSchema)],Call(EmpresaController.store))
router.put('/:id_empresa',[validateSchema(updateEmpresaSchema)],Call(EmpresaController.update))
export default router;