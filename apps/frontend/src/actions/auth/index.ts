"use server";

import { LoginEmployeeSchema } from "@repo/types/dto";

import { setAdminToken } from "../admin-token";

import { EmployeeAuthService } from "@/services/api/backend/auth/EmployeeAuth.service";
import { SignInHandler } from "@/types/app/admin";
import { mapZodErrorsToClient } from "@/utils/Forms.utils";

export const signIn = async (_state: SignInHandler, formData: FormData): Promise<SignInHandler> => {
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

    await setAdminToken(accessToken);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Błędne dane. Wpisz poprawne i zaloguj ponownie.", defaultValues };
  }
};
