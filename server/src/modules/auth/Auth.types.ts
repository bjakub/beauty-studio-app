import { UserRoles } from '@shared/dto/Users';
import { User } from '.prisma/client';

export type UserJwtPayload = {
  userId: string;
  username: string | null;
  role: UserRoles;
};

export type UserWithoutPassword = Omit<User, 'password'>;
