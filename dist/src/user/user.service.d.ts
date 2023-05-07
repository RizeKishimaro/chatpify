/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { CryptoService } from '../security/aes-hasher.help';
export declare class UserService {
    private userModel;
    private jwtService;
    private cryptoService;
    constructor(userModel: Model<User>, jwtService: JwtService, cryptoService: CryptoService);
    getUser(id: string): Promise<User[] | User>;
    getUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto, req: any): Promise<object>;
    loginUser(email: any, password: any, cryptoService: CryptoService): Promise<{
        info: {
            access_token: string;
            status: string;
            message: string;
        };
    }>;
    deleteUser(id: string): Promise<object>;
    patchUser(id: number, userInfo: object): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, User>;
    updateUser(id: number): string;
}
