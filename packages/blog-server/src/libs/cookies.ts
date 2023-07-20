import { type Response } from 'express';

const domains =
  process.env.ENVIRONMENT === 'production' ? ['.kwkang.dev', 'kwkang.net'] : [undefined];

export const setTokenCookies = (
  res: Response,
  tokens: { accessToken: string; refreshToken: string }
) => {
  domains.forEach((domain) => {
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
      path: '/',
      domain,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: '/',
      domain,
    });
  });
};

export const clearCookie = (res: Response) => {
  domains.forEach((domain) => {
    res.clearCookie('access_token', { domain, path: '/' });
    res.clearCookie('refresh_token', { domain, path: '/' });
  });
};
