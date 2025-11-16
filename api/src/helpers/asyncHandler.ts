import { NextFunction, Request, Response } from 'express';
import { sendApiResponse } from './sendResponse.js';
import { ApiError } from '../helpers/ApiError.js';

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      const err = error as ApiError;
      const errorMsg = err.message || 'Something went wrong.';
      const statusCode = err.statusCode || 500;
      return sendApiResponse(res, statusCode, errorMsg);
    }
  };
