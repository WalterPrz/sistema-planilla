import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import TipoBonoController from "../../app/Controllers/TipoBonoController.mjs"
import createTipoBonoSchema from "../../app/Schemas/TipoBono/createSchema.mjs";
import updateTipoBonoSchema from "../../app/Schemas/TipoBono/updateSchema.mjs";
import deleteTipoBonoSchema from "../../app/Schemas/TipoBono/deleteSchema.mjs";
const router = Router();
router.get('/',[] ,Call(TipoBonoController.index))
router.post('/', [validateSchema(createTipoBonoSchema)], Call(TipoBonoController.store))
router.put('/:id_tipo_bono', [validateSchema(updateTipoBonoSchema)], Call(TipoBonoController.update))
router.delete('/:id_tipo_bono', [validateSchema(deleteTipoBonoSchema)], Call(TipoBonoController.delete))
export default router;