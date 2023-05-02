import BaseError from './BaseError.mjs';
import HttpCode from '../configs/HttpCodes.mjs';

export default class NoAuthException extends BaseError {
  constructor(name = 'UNAUTHORIZED', statusCode = HttpCode.HTTP_UNAUTHORIZED, description = 'No autenticado') {
    super(name, statusCode, description);
  }
}
