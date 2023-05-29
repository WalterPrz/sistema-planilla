//import { validationResult, checkSchema } from "express-validator";
import HttpCode from "../../configs/HttpCodes.mjs";
import exValidator from "./express-valitation.mjs";
const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await exValidator.checkSchema(schema).run(req);
      const errors = exValidator.validationResult(req);
      if (errors.isEmpty()) {
        return next()
      }
      return res.status(HttpCode.HTTP_UNPROCESSABLE_ENTITY).json({
        errors: errors.array()
      })
    } catch (e) {
      throw e
    }
  };
};
export default validateSchema
