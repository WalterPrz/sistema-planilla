import { CentroCosto } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteCentroCostoSchema = {
    id_partida_contable: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id del centro de costo",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_partida_contable', CentroCosto)
        },
    },
};
export default deleteCentroCostoSchema;
