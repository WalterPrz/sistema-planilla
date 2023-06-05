import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import CentroCostoController from "../../app/Controllers/CentroCostoController.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import createCentroCostoSchema from "../../app/Schemas/CentroCosto/createSchema.mjs";
import updateCentroCostoSchema from "../../app/Schemas/CentroCosto/updateSchema.mjs"
import deleteCentroCostoSchema from "../../app/Schemas/CentroCosto/deleteSchema.mjs"
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_CENTRO_COSTO'), ],Call(CentroCostoController.index))
router.post('/',[hasRole('CREATE_CENTRO_COSTO'), validateSchema(createCentroCostoSchema)],Call(CentroCostoController.store))
router.put('/:id_partida_contable',[hasRole('UPDATE_CENTRO_COSTO'), validateSchema(updateCentroCostoSchema)],Call(CentroCostoController.update))
router.delete('/:id_partida_contable',[hasRole('DESTROY_CENTRO_COSTO'), validateSchema(deleteCentroCostoSchema)],Call(CentroCostoController.delete))
export default router;