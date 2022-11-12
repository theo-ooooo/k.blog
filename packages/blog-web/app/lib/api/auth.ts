import { type HeadersInit } from "@remix-run/node";
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

export async function login(params: AuthParams) {
  const response = await client.post<AuthResult>("/api/v1/auth/login", params);
  return { result: response.data, headers: response.headers };
}
