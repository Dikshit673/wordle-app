import { asyncHandler } from '@/helpers/asyncHandler.js';
import { throwApiError } from '@/helpers/sendResponse.js';
import { EnvVars } from '@/utils/EnvVars.js';
import { getJwtTokenUser } from '@/utils/tokens.js';
import z from 'zod';

const sessionCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid refresh cookie format');

const { AUTH_COOKIE_NAME } = EnvVars;

export const sessionAuth = asyncHandler(async (req, _, next) => {
  const cookiedata = req.cookies[AUTH_COOKIE_NAME];
  const parsed = sessionCookieSchema.safeParse(cookiedata);
  if (!parsed.success)
    return throwApiError(401, 'token malformed or missing in cookies');

  const token = parsed.data;
  const decoded = getJwtTokenUser(token);
  if (!decoded.success) return throwApiError(401, 'token is invalid');

  req.user = decoded.data.user;
  next();
});
