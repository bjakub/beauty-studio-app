import { z } from 'zod';

export const userRolesSchema = z.tuple([
  z.literal('ADMIN'),
  z.literal('USER'),
  z.literal('WORKER'),
]);

export const createUserSchema = z.object({
  email: z.string().email(),
  role: userRolesSchema,
  password: z.string().min(8).max(20),
  name: z.string().min(1).max(50).optional(),
  surname: z.string().min(1).max(100).optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UserRoles = z.infer<typeof userRolesSchema>;
