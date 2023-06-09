import { PuestoTrabajoDependencia } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deletePuestoTrabajoDependenciaSchema = {
    id_puesto_trabajo_dependencia: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_puesto_trabajo_dependencia', PuestoTrabajoDependencia)
        },
    },
};
export default deletePuestoTrabajoDependenciaSchema;
