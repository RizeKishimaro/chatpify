import { SetMetadata } from '@nestjs/common';
import { PremiumRoles } from '../config/database.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: PremiumRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
