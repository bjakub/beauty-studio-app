"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "session";

export const createSession = async (jwt: string) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, jwt, { path: "/admin", httpOnly: true, sameSite: "lax", secure: true });
};

export const getSession = async () => {
  const cookieStore = await cookies();

  if (cookieStore.has(COOKIE_NAME)) {
    // TODO: Tutaj musimy zwalidować token tzn. sprawdzić czy przez przypadek nie wygasł juz :D
    // TODO: Na ten moment zwracamy token bez walidacji
    return cookieStore.get(COOKIE_NAME);
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete({ name: COOKIE_NAME, path: "/admin" });
  redirect("/admin");
};
