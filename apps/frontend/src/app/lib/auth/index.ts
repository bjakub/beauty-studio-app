"use server";

import { LoginEmployeeSchema } from "@repo/types/dto";
import { SignInHandler } from "@repo/types/modules";
import { ZodError } from "zod";

import { createSession } from "@/app/lib/session";
import { EmployeeAuthService } from "@/services/apis/backend/auth/EmployeeAuth.service";

export const signIn = async (state: SignInHandler, formData: FormData): Promise<SignInHandler> => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const defaultValues = { username, password };

  try {
    const fields = await LoginEmployeeSchema.safeParseAsync({ username, password });

    if (!fields.success) {
      return {
        success: false,
        errors: mapZodErrorsToClient(fields.error),
        defaultValues,
      };
    }

    const { accessToken } = await EmployeeAuthService.login(username, password);
    await createSession(accessToken);

    return { success: true };
  } catch (error) {
    return { success: false, message: "An error occurred while signing in.", defaultValues };
  }
};

const mapZodErrorsToClient = (zodError: ZodError): Record<string, string> =>
  zodError.errors.reduce<Record<string, string>>(
    (acc, error) => ({
      ...acc,
      [error.path[0]]: error.message,
    }),
    {},
  );
