import { UserRole } from '@shared/dto/Users';
import { User } from '.prisma/client';

export type UserJwtPayload = {
  userId: number;
  role: UserRole;
};

export type UserWithoutPassword = Omit<User, 'password'>;
