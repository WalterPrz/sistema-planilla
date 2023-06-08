import { Planilla } from "../../models/index.mjs";
import Sequelize, { Op } from "sequelize";
import { verifyDataExist, callValidateFunc } from '../utils.mjs'
import moment from "moment";
const customVerifyExist = callValidateFunc(verifyDataExist);
const updatePlanillaSchema = {
    id_planilla: {
        isInt: {
            bail: true,
            errorMessage: "Valor incorrecto en id de la planilla",
        },
        custom: {
            bail: true,
            options: customVerifyExist('id_planilla', Planilla)
        },
    }
};
export default updatePlanillaSchema;
