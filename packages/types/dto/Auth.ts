import { z } from "zod";

export const LoginEmployeeSchema = z.object({
  username: z
    .string({ message: "Must be string" })
    .min(3, "Must have more than 3 characters")
    .max(50, "Must have less than 50 characters"),
  password: z
    .string({ message: "Must be string" })
    .min(8, "Must have more than 8 characters")
    .max(20, "Must have less than 20 characters"),
});

export const VerifyTokenSchema = z.object({
  token: z
    .string({ message: "Must be string" })
    .min(1, "Must have more than 1 character"),
});

export type VerifyTokenDTO = z.infer<typeof VerifyTokenSchema>;
export type LoginEmployeeDTO = z.infer<typeof LoginEmployeeSchema>;
