import { fetchClient } from "../client";
import { AuthResult } from "./auth";

export async function getMe() {
  // const response = await client.get<AuthResult>("/api/v1/users/me", {
  //   headers: { Cookie: cookie },
  // });
  const response = await fetchClient.request<AuthResult>({
    url: "api/v1/users/me",
    method: "GET",
  });

  return response.data;
}
