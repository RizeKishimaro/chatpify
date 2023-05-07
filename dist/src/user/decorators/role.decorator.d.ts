import { PremiumRoles } from '../config/database.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: PremiumRoles[]) => import("@nestjs/common").CustomDecorator<string>;
