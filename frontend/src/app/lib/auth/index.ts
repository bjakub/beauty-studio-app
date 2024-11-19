"use server";

import { FormState } from "@/app/lib/auth/auth.types";
import { createSession } from "@/app/lib/session";
import { EmployeeAuthService } from "@/services/apis/backend/auth/EmployeeAuth.service";

export const signIn = async (state: FormState, formData: FormData): Promise<FormState> => {
  // TODO: Zrób walidację z folderu shared/dto/Auth.ts
  const username: string = formData.get("username") as string;
  const password: string = formData.get("password") as string;

  try {
    const { accessToken } = await EmployeeAuthService.login(username, password);
    await createSession(accessToken);

    return;
  } catch (error) {
    console.error(error);

    return "jakiś błąd!";
  }
};
