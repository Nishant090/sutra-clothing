
import axios from "axios";
import { api } from "../../../lib/axios";
import type { AuthUser } from "../types/auth.type";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  Message: string;
  user: AuthUser;
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/api/v1/auth/login",
    credentials
  );

  return response.data;
}

export function getLoginError(error: unknown): string {
  if (axios.isAxiosError<{ message?: string; Message?: string }>(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.Message ??
      error.message ??
      "Unable to log in. Please try again."
    );
  }

  return "An unexpected error occurred. Please try again.";
}
