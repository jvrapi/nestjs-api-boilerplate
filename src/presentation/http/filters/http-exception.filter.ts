import { BaseException } from '@/shared/exceptions/base.exception.js';
import { ErrorCodes } from '@/shared/exceptions/enums/error-codes.js';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

const ERROR_CODE_TO_STATUS: Record<ErrorCodes, number> = {
  [ErrorCodes.INVALID_ARGUMENT]: 400,
  [ErrorCodes.NOT_FOUND]: 404,
  [ErrorCodes.DUPLICATE_ENTRY]: 409,
};

@Catch(BaseException, HttpException)
export class ErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandler.name);

  catch(exception: BaseException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status: number;
    let body: { message: string; className: string };

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse() as any;
      const messages = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message.join(', ')
        : exceptionResponse.message;
      status = 400;
      body = { message: messages, className: 'InvalidArgumentException' };
    } else if (exception instanceof BaseException) {
      status = ERROR_CODE_TO_STATUS[exception.code] ?? 500;
      body = { message: exception.message, className: exception.name };
    } else {
      status = exception.getStatus();
      body = { message: exception.message, className: exception.name };
    }

    this.logger.error(body.message, exception.stack);
    response.status(status).send(body);
  }
}
