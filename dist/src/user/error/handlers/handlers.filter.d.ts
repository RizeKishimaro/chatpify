import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost): any;
}
export declare class HandleValidateError implements ExceptionFilter {
    catch(validateError: Error, host: ArgumentsHost): any;
}
