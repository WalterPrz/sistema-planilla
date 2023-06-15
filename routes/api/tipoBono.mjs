import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import validateSchema from "../../app/utils/validationResult.mjs";
import TipoBonoController from "../../app/Controllers/TipoBonoController.mjs"
import createTipoBonoSchema from "../../app/Schemas/TipoBono/createSchema.mjs";
import updateTipoBonoSchema from "../../app/Schemas/TipoBono/updateSchema.mjs";
import deleteTipoBonoSchema from "../../app/Schemas/TipoBono/deleteSchema.mjs";
import hasRole from "../../app/middlewares/hasRole.mjs"
const router = Router();
router.get('/',[hasRole('LIST_TIPO_BONO'), ] ,Call(TipoBonoController.index))
router.post('/', [hasRole('CREATE_TIPO_BONO'), validateSchema(createTipoBonoSchema)], Call(TipoBonoController.store))
router.put('/:id_tipo_bono', [hasRole('UPDATE_TIPO_BONO'), validateSchema(updateTipoBonoSchema)], Call(TipoBonoController.update))
router.delete('/:id_tipo_bono', [hasRole('DESTROY_TIPO_BONO'), validateSchema(deleteTipoBonoSchema)], Call(TipoBonoController.delete))
export default router;