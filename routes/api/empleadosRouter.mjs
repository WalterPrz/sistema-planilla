import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import DeduccionesController from '../../app/Controllers/DeduccionesController.mjs';

const router = Router();
router.get('/:id_empleado/deducciones', Call(DeduccionesController.getEmpleadoDeducciones))
export default router;