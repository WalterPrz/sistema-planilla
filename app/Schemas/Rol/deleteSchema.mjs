import { Rol } from "../../models/index.mjs";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
const customVerifyExist = callValidateFunc(verifyDataExist);
const deleteRolSchema = {
    id_rol: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en el id dependencia.",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_rol', Rol)
        },
    },
};
export default deleteRolSchema;
