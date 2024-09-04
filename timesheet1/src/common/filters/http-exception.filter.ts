import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { IResponse, IValidationError } from 'src/common/types/response.type';

@Catch()
export class HttpExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message, stack } = exception;
    Logger.error('log errr mess', JSON.stringify({ message, stack }));
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseMessage = message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (exception instanceof BadRequestException && exceptionResponse) {
        const validationErrors =
          exceptionResponse?.['message'] || exceptionResponse;
        if (Array.isArray(validationErrors)) {
          responseMessage = validationErrors.map((error) => ({
            field: error.property,
            errors: Object.values(error.constraints),
          })) as IValidationError[];
        } else {
          responseMessage = exceptionResponse;
        }
      } else {
        responseMessage = exceptionResponse;
      }
    }
    const resBody: IResponse<null> = {
      statusCode: status,
      data: null,
      errors: responseMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    return response.status(status).json(resBody);
  }
}
