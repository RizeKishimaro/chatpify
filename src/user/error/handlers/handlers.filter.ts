import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception.code === 11000) {
      return response.status(400).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Your account is already exist please login!',
      });
    } else {
      throw new Error('lee');
    }
  }
}
@Catch(Error)
export class HandleValidateError implements ExceptionFilter {
  catch(validateError: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (validateError.name === 'ValidationError') {
      return response.status(400).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: validateError.message,
      });
    } else if (validateError.name === 'HttpException') {
      return response.status(400).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: validateError.message,
      });
    } else if (validateError.name === 'CastError') {
      return response.status(400).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `The User \`${request.params.id}\` is not valid type`,
      });
    } else {
      return new HttpException(
        {
          error: '_ERR',
          message: 'Sorry the server is Currently In Shutdown',
        },
        500,
      );
    }
  }
}
