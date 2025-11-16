// middleware/hmacAuth.ts
import { asyncHandler } from '@/helpers/asyncHandler.js';
import { throwApiError } from '@/helpers/sendResponse.js';
import { EnvVars } from '@/utils/EnvVars.js';
import crypto from 'crypto';
import CryptoJs from 'crypto-js';

const { HMAC_SECRET } = EnvVars;
const MAX_AGE_MS = 3 * 10 * 1000;

export const hmacAuth = asyncHandler(async (req, _, next) => {
  const signature = req.headers['x-signature'] as string;
  const timestamp = req.headers['x-timestamp'] as string;
  console.log({ signature });

  // console.log(req.headers);

  if (!signature || !timestamp)
    return throwApiError(401, 'Missing signature headers');

  // replay protection
  const now = Date.now();
  if (Math.abs(now - Number(timestamp)) > MAX_AGE_MS)
    return throwApiError(401, 'Expired timestamp');

  const secret = HMAC_SECRET!;
  const body = JSON.stringify(req.body || {});
  const url = req.originalUrl || '';
  const msg = body + timestamp + url;

  console.log({ msg, secret });

  const expectedHex = crypto
    .createHmac('sha256', secret)
    .update(msg)
    .digest('hex');

  // compare hex strings using timingSafeEqual
  const provided = Buffer.from(signature, 'hex');
  const expected = Buffer.from(expectedHex, 'hex');
  console.log({ provided, expected });

  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  )
    return throwApiError(401, 'Invalid signature');

  next();
});
