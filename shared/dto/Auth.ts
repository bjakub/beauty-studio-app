import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});


export type LoginUserDTO = z.infer<typeof loginUserSchema>;