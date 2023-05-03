import BaseError from './BaseError.mjs';
import HttpCode from '../configs/HttpCodes.mjs';

export default class BadRequestException extends BaseError {
  constructor(description = 'Ha ocurrido un error.', 
  name = 'BAD_REQUEST', 
  statusCode = HttpCode.HTTP_UNPROCESSABLE_ENTITY, 
  isOperational = false) {
    super(name, statusCode, description);
    this.name =  "BAD_REQUEST"
    this.description = description,
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    //Error.captureStackTrace(this);
  }
}
