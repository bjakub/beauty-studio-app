import { z } from 'zod';

export const UserRolesSchema = z.tuple([
  z.literal('ADMIN'),
  z.literal('USER'),
  z.literal('WORKER'),
]);

export const PasswordSchema = z.string().min(8).max(20)

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
  role: UserRolesSchema.optional(),
  name: z.string().max(50).optional(),
  surname: z.string().max(100).optional(),
});

export type UserRoles = z.infer<typeof UserRolesSchema>;
