import client from "../client";
import { User } from "./types";

interface AuthParams {
  email: string;
  password: string;
}
export interface AuthResult {
  result: boolean;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
}

export async function logout() {
  return await client.get("/api/v1/auth/logout");
}

export async function login(params: AuthParams) {
  // const response = await client.post<AuthResult>("/api/v1/auth/login", params);
  const response = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  return { result: data, headers: response.headers };
}
