import { validationResult, checkSchema } from "express-validator";
import HttpCode from "../../configs/HttpCodes.mjs";

const validateSchema = (schema) => {
    return async(req, res, next) => {
        try {
            await checkSchema(schema).run(req);
            const errors = validationResult(req);
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