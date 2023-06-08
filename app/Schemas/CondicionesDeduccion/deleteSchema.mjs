import { CondicionesDeduccion } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteCondicionesDeduccionSchema = {
    id_condicion_descuento: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id_condicion_descuento.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_condicion_descuento', CondicionesDeduccion)
        },
    },
};
export default deleteCondicionesDeduccionSchema;
