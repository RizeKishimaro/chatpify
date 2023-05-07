"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleValidateError = exports.MongoExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongoExceptionFilter = class MongoExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception.code === 11000) {
            return response.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Your account is already exist please login!',
            });
        }
        else {
            throw new Error('lee');
        }
    }
};
MongoExceptionFilter = __decorate([
    (0, common_1.Catch)(mongodb_1.MongoError)
], MongoExceptionFilter);
exports.MongoExceptionFilter = MongoExceptionFilter;
let HandleValidateError = class HandleValidateError {
    catch(validateError, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (validateError.name === 'ValidationError') {
            return response.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: validateError.message,
            });
        }
        else if (validateError.name === 'HttpException') {
            return response.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: validateError.message,
            });
        }
        else if (validateError.name === 'CastError') {
            return response.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `The User \`${request.params.id}\` is not valid type`,
            });
        }
        else if (validateError.name === 'SyntaxError' &&
            validateError.message.includes('JSON')) {
            return response.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid JSON format',
            });
        }
        else {
            return new common_1.HttpException({
                error: '_ERR',
                message: 'Sorry the server is Currently In Shutdown',
            }, 500);
        }
    }
};
HandleValidateError = __decorate([
    (0, common_1.Catch)(Error)
], HandleValidateError);
exports.HandleValidateError = HandleValidateError;
//# sourceMappingURL=handlers.filter.js.map