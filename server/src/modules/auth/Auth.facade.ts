import { User } from '@prisma/client';

export class AuthFacade {
  constructor() {}
  async signIn(user: Omit<User, 'password'>): Promise<void> {
    console.log(user);

    // TODO: Generate JWT and return here

    return;
  }
}
