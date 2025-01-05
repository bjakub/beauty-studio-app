import { z } from 'zod';

export const UserDetailsSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50).optional(),
  email: z.string().email().optional(),
})