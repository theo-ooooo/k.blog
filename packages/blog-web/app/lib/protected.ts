import { logout, refresh } from "./api/auth";
import { User } from "./api/types";
import { getMe } from "./api/user";
import { setClientCookie } from "./client";

export async function getMyUserInfo() {
  try {
    const { user } = await getMe();
    return { user };
  } catch (e) {
    try {
      const { result, headers } = await refresh();

      setClientCookie(`access_token=${result.tokens?.accessToken}`);

      const { user } = await getMe();

      return { user, result, headers };
    } catch (innerErr) {
      throw innerErr;
    }
  }
}

export async function checkIsLoggedIn() {
  try {
    await getMyUserInfo();
    return true;
  } catch (e) {
    return false;
  }
}
