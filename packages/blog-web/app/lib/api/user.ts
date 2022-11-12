import client from "../client";
import { AuthResult } from "./auth";

export async function getMe(cookie: string) {
  const response = await client.get<AuthResult>("/api/v1/users/me", {
    headers: { Cookie: cookie },
  });
  return response.data;
}
