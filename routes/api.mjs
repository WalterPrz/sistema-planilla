import { Router } from "express";
import pruebaRouter from './api/prueba.mjs'
const router = Router();
router.use('/prueba',pruebaRouter)
export default router;