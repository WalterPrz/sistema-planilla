import BaseError from './BaseError.mjs';
import HttpCode from '../configs/HttpCodes.mjs';

export default class NotFoundExeption extends BaseError {
  constructor(
    name = 'NOT_FOUND', 
    statusCode = HttpCode.HTTP_NOT_FOUND, 
    description= 'Recurso no encontrado'
  ) {
    super(name, statusCode, description);
  }
}