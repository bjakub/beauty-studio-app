import { z } from 'zod';

export const LoginEmployeeSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(20),
});

export interface AuthLoginAPIResponse {
  accessToken: string;
}