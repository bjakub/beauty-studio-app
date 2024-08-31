import { z } from 'zod';
import { createUserSchema, passwordSchema } from './Users';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const registerUserSchema = createUserSchema.extend({ confirmPassword: passwordSchema}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
});


export type LoginUserDTO = z.infer<typeof loginUserSchema>;
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;