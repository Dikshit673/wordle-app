import { asyncHandler } from '@/helpers/asyncHandler.js';
import { setSessionCookie } from '@/utils/cookies.js';
import { issueJwtToken } from '@/utils/tokens.js';
import { sendApiResponse } from '@/helpers/sendResponse.js';
import { EnvVars } from '@/utils/EnvVars.js';

const { TRUSTED_CLIENT_ID } = EnvVars;

export const sessionInit = asyncHandler(async (_req, res) => {
  const user = { clientId: TRUSTED_CLIENT_ID };
  const sessionToken = issueJwtToken(user);
  setSessionCookie(res, sessionToken);
  return sendApiResponse(res, 200, 'Session initialized', null);
});
