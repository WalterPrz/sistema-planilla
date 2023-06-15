import { TipoBono } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteTipoBonoSchema = {
    id_tipo_bono: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id_tipo_bono.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_tipo_bono', TipoBono)
        },
    },
};
export default deleteTipoBonoSchema;
