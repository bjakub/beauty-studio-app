import { z } from 'zod';
import { CreateEmployeeSchema, PasswordSchema } from './Employee'

export const LoginEmployeeSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(20),
});

export const RegisterEmployeeSchema = CreateEmployeeSchema.extend({ confirmPassword: PasswordSchema}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
});


export type RegisterEmployeeDTO = z.infer<typeof RegisterEmployeeSchema>;

export interface AuthRegisterAPIResponse {
  accessToken: string;
}

export interface AuthLoginAPIResponse {
  accessToken: string;
}