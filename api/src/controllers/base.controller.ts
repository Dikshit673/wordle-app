import { asyncHandler } from '@/helpers/asyncHandler.js';
import { sendApiResponse } from '@/helpers/sendResponse.js';

export const baseController = asyncHandler(async (_, res) => {
  return sendApiResponse(res, 200, 'Hello from API!', null);
});

export const healthController = asyncHandler(async (_, res) => {
  return sendApiResponse(res, 200, 'health OK', null);
});
