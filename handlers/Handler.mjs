import BaseError from './BaseError.mjs';
import HttpCode from '../configs/HttpCodes.mjs';
export default class Handler {
    static handlerError(err, req, res, next) {
        console.log("Ocurrio un error:", err)
        const debug = process.env.APP_DEBUG === 'true';
        if (err.name && err.name === 'JsonSchemaValidation') return res.status(HttpCode.HTTP_BAD_REQUEST).json(err.validations.body);    
        if (debug) return res.status(err.statusCode || HttpCode.HTTP_INTERNAL_SERVER_ERROR).json(err);
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          return res.status(HttpCode.HTTP_BAD_REQUEST).json(err.errors.map((row) => ({
            field: row.path,
            message: row.message,
          })));
        }
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({ message: 'No se puede eliminar uno o más registros debido a que tienen acciones asociadas al sistema' });
        }
        return res.status(err.statusCode || HttpCode.HTTP_INTERNAL_SERVER_ERROR).json({
          message: err.message,
        });
    }
}