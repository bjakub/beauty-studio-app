import { AuthLoginAPI, VerifyTokenAPI } from "@repo/types/api";

import { AbstractFetchApi } from "@/services/AbstractFetchApi";

export class EmployeeAuthService extends AbstractFetchApi {
  private static EMPLOYEE_AUTH_URL: string = process.env.API_URL + "/auth";

  static login(username: string, password: string): Promise<AuthLoginAPI> {
    const body = JSON.stringify({ username, password });

    return this.detectResponse<AuthLoginAPI>(`${this.EMPLOYEE_AUTH_URL}/login`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static verifyToken(token: string): Promise<VerifyTokenAPI> {
    const body = JSON.stringify({ token });

    return this.detectResponse<VerifyTokenAPI>(`${this.EMPLOYEE_AUTH_URL}/token/verify`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
