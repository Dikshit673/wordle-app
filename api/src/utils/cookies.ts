import { Response } from 'express';
import { EnvVars } from './EnvVars.js';

const { IS_DEV, AUTH_COOKIE_NAME } = EnvVars;
const IS_PROD = !IS_DEV;

const COOKIE_CONFIG = {
  name: AUTH_COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: (IS_PROD ? 'Strict' : 'Lax') as 'strict' | 'lax' | 'none',
    maxAge: 60 * 60 * 1000,
  },
};

export const setSessionCookie = (res: Response, token: string) => {
  const { name, options } = COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearSessionCookies = (res: Response) => {
  const { name, options } = COOKIE_CONFIG;
  res.clearCookie(name, options);
};
