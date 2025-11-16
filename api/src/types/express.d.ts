import { User } from './user.ts';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
