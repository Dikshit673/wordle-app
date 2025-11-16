import { Response } from 'express';
import { ApiResponse } from './ApiResponse.js';
import { ApiError } from '../helpers/ApiError.js';

export const sendApiResponse = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  res.status(status).json(new ApiResponse(status, message, data || null));
};

export const throwApiError = (statusCode: number, message: string) => {
  throw new ApiError(statusCode, message);
};
