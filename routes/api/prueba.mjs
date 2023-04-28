import { Router } from "express";
import Call from "../../app/utils/Call.mjs";
import PruebaController from "../../app/Controllers/PruebaController.mjs";
const router = Router();
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
    next();
});
router.get('/', PruebaController.index);
router.get('/about', (req, res) => {
    res.send('Los gatos = mishis')
}) 
export default router;
