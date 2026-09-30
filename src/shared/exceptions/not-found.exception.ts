import { BaseException } from './base.exception.js';
import { ErrorCodes } from './enums/error-codes.js';

export class NotFoundException extends BaseException {
  constructor(message?: string) {
    super(ErrorCodes.NOT_FOUND, NotFoundException.name, message ?? 'Not Found');
  }
}
