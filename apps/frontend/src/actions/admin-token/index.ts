"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { EmployeeAuthService } from "@/services/api/backend/auth/EmployeeAuth.service";

const COOKIE_NAME = "ADMIN_TOKEN";

export const setAdminToken = async (jwt: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, jwt, { path: "/admin", httpOnly: true, sameSite: "lax", secure: true });
};

export const getAdminToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {
      const { isValid: isTokenValid } = await EmployeeAuthService.verifyToken(token);

      if (isTokenValid) {
        return token;
      }
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const logoutAdmin = async () => {
  const cookieStore = await cookies();

  cookieStore.delete({ name: COOKIE_NAME, path: "/admin" });
  redirect("/admin");
};
