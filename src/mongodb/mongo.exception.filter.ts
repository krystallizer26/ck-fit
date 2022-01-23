import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = (type, message) => {
      console.log(type, message)
      response.status(status).json({
        statusCode: status,
        message: message,
        error: type,
      });
    };
    // console.log(JSON.stringify(exception))
    switch (exception.code) {
      case 11000: // duplicated
        responseMessage(exception.name, "Attempt duplicating the data which is supposed to be unique.");
        break;
      default:
        responseMessage(exception.name, exception.message);
    }
  }
}