import { z } from 'zod';

export const userRolesSchema = z.tuple([
  z.literal('ADMIN'),
  z.literal('USER'),
  z.literal('WORKER'),
]);

export const passwordSchema = z.string().min(8).max(20)

export const createUserSchema = z.object({
  email: z.string().email(),
  role: userRolesSchema.optional(),
  password: passwordSchema,
  name: z.string().max(50).optional(),
  surname: z.string().max(100).optional(),
});

export type UserRoles = z.infer<typeof userRolesSchema>;
