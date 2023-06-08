import { TipoDeduccion } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteTipoDeduccionSchema = {
    id_deduccion: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id_deduccion.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_deduccion', TipoDeduccion)
        },
    },
};
export default deleteTipoDeduccionSchema;
