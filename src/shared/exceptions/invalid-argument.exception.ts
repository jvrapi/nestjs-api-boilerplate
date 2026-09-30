import { BaseException } from './base.exception.js';
import { ErrorCodes } from './enums/error-codes.js';

export class InvalidArgumentException extends BaseException {
  constructor(message: string) {
    super(ErrorCodes.INVALID_ARGUMENT, InvalidArgumentException.name, message);
  }
}
