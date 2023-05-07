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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/signup-user.dto';
import { CryptoService } from '../security/aes-hasher.help';
export declare class UserController {
    private userService;
    private hashAesAlgo;
    constructor(userService: UserService, hashAesAlgo: CryptoService);
    getUser(id: any): object;
    getAllUsers(req: any): Promise<string | object>;
    signUpUser(userInfo: CreateUserDto, req: any): Promise<object>;
    renderLogin(req: any, res: any): any;
    loginUser(userInfo: LoginDto): Promise<{
        info: {
            access_token: string;
            status: string;
            message: string;
        };
    }>;
    patchUser(id: number, userInfo: CreateUserDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & Omit<import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & Omit<import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("./schema/user.schema").User>;
    deleteUser(id: string): Promise<object>;
}
