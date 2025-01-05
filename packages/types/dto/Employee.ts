import { z } from 'zod';
import { UserDetailsSchema } from './UserDetails';

export const EmployeeRuleSchema = z.union([
  z.literal("OWNER"),
  z.literal("WORKER")
]);

export const EmployeeExperienceSchema = z.union([
  z.literal("INTERN"),
  z.literal("MIDDLE"),
  z.literal("SENIOR")
])

export const PasswordSchema = z.string().min(8).max(20)

export const CreateEmployeeSchema = z.object({
  username: z.string().max(50),
  password: PasswordSchema,
  isActive: z.boolean(),
  experience: EmployeeExperienceSchema,
  userDetails: UserDetailsSchema.optional()
});

export const ChangeEmployeeStatusSchema = z.object({
  id: z.number(),
  isActive: z.boolean()
});

export type EmployeeRole = z.infer<typeof EmployeeRuleSchema>;
export type EmployeeExperience = z.infer<typeof EmployeeExperienceSchema>;
export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;
export type ChangeEmployeeStatusDTO = z.infer<typeof ChangeEmployeeStatusSchema>;
