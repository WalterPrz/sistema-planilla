import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import CatalogosController from "../../app/Controllers/CatalogosController.mjs";

const router = Router();
router.get('/estructura-territorial',Call(CatalogosController.getEstructuraTerritorial))
router.get('/departamento',Call(CatalogosController.getDepartamento))
router.get('/municipio',Call(CatalogosController.getMunicipio))
router.get('/estado-civil',Call(CatalogosController.getEstadoCivil))
router.get('/genero',Call(CatalogosController.getGenero))
router.get('/profesion',Call(CatalogosController.getProfesion))
router.get('/tipo-documento',Call(CatalogosController.getTipoDocumento))

export default router;