import { z } from 'zod';
import { CreateUserSchema, PasswordSchema } from './Users';

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const RegisterUserSchema = CreateUserSchema.extend({ confirmPassword: PasswordSchema}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
});


export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export interface AuthRegisterAPIResponse {
  accessToken: string;
}

export interface AuthLoginAPIResponse {
  accessToken: string;
}