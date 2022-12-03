import { fetchClient } from "../client";
import { User } from "./types";

interface AuthParams {
  email: string;
  password: string;
}
export interface AuthResult {
  result: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
}

export async function logout() {
  return await fetchClient.request({
    url: "api/v1/auth/logout",
    method: "GET",
  });
}

export async function login(params: AuthParams) {
  const { data, headers } = await fetchClient.request<AuthResult>({
    url: "api/v1/auth/login",
    method: "POST",
    body: params,
  });

  return { result: data, headers };
}

export async function refresh() {
  const { data, headers } = await fetchClient.request<AuthResult>({
    url: "api/v1/auth/refresh",
    method: "POST",
  });

  return { result: data, headers };
}
