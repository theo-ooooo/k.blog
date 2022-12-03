export const extractAccessToken = (cookie: string) => {
  const match = cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
};
