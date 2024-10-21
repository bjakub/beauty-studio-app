import { UserRoles } from '@shared/dto/Users';
import { User } from '.prisma/client';

export type UserJwtPayload = {
  userId: number;
  role: UserRoles;
};

export type UserWithoutPassword = Omit<User, 'password'>;
