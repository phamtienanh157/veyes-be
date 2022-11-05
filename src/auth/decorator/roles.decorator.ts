import { ERole } from './../../common/constants/index';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);
