import { Permiso } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deletePermisoSchema = {
    id_permiso: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_permiso', Permiso)
        },
    },
};
export default deletePermisoSchema;
