import { Dependencia, } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteDependenciaSchema = {
    id_dependencia: {
        isNumeric: {
            options: { no_symbols: true },
            bail: true,
            errorMessage: "Valor incorrecto en el tipo de dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_dependencia', Dependencia)
        },
    },
};
export default deleteDependenciaSchema;
