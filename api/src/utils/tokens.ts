import { User } from '@/types/user.js';
import jwt, { SignOptions, type JwtPayload } from 'jsonwebtoken';
import { EnvVars } from './EnvVars.js';

type JwtUserPayload = JwtPayload & User;

type JwtConfig = {
  secret: string;
  options: SignOptions;
};

const { JWT_SECRET } = EnvVars;

const JWT_CONFIG: JwtConfig = {
  secret: JWT_SECRET,
  options: {
    expiresIn: '1h',
  },
};

const extractUser = (decodedPayload: JwtUserPayload): User => {
  const { iat, exp, nbf, jti, aud, iss, sub, ...userPayload } = decodedPayload;
  return userPayload;
};

export const issueJwtToken = (payload: User): string => {
  const { secret, options } = JWT_CONFIG;
  return jwt.sign(payload, secret, options);
};

const verifyJwtToken = (token: string): JwtUserPayload => {
  const { secret } = JWT_CONFIG;
  return jwt.verify(token, secret) as JwtUserPayload;
};

export const getJwtTokenUser = (token: string) => {
  try {
    const success = true as const;
    const payload = verifyJwtToken(token);
    const user = extractUser(payload);
    return { success, data: { user } };
  } catch (error) {
    const success = false as const;
    const err = error as Error;
    const message = err.message || 'something wrong with access token.';
    return { success, error: { ...err, message } };
  }
};
