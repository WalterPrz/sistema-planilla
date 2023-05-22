import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import CentroCostoController from "../../app/Controllers/CentroCostoController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createCentroCostoSchema from "../../app/Schemas/CentroCosto/createSchema.mjs";
import updateCentroCostoSchema from "../../app/Schemas/CentroCosto/updateSchema.mjs"
import deleteCentroCostoSchema from "../../app/Schemas/CentroCosto/deleteSchema.mjs"

const router = Router();
router.get('/',Call(CentroCostoController.index))
router.post('/',[validateSchema(createCentroCostoSchema)],Call(CentroCostoController.store))
router.put('/:id_partida_contable',[validateSchema(updateCentroCostoSchema)],Call(CentroCostoController.update))
router.delete('/:id_partida_contable',[validateSchema(deleteCentroCostoSchema)],Call(CentroCostoController.delete))
export default router;