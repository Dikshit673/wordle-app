import path from 'path';
import fs from 'fs';

import { asyncHandler } from '@/helpers/asyncHandler.js';
import { sendApiResponse, throwApiError } from '@/helpers/sendResponse.js';
import { generateHint } from '@/utils/hints.js';
import { encryptWord } from '@/utils/cryptoUtil.js';

const wordMapPath = path.join(process.cwd(), 'wordMap.json');

// Load dictionary
console.log('Loading wordMap.json...');

if (!fs.existsSync(wordMapPath)) {
  console.error('❌ wordMap.json not found. Run: npm run generate:words');
  process.exit(1);
}
const wordMap: Record<string, string[]> = JSON.parse(
  fs.readFileSync(wordMapPath, 'utf-8')
);
console.log('✅ Loaded wordMap.json');
// function for generaterandom number form min to max

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getWord = asyncHandler(async (_req, res) => {
  const length = generateRandomNumber(4, 8); // 4–8
  const words = wordMap[String(length)];

  if (!words || words.length === 0) {
    return throwApiError(404, `No words found for length ${length}`);
  }

  const randomWordIndex = Math.floor(Math.random() * words.length);
  const word = words[randomWordIndex];
  const encryptedWord = encryptWord(word);

  return sendApiResponse(res, 200, 'Success', {
    length,
    hint: generateHint(word),
    word: encryptedWord,
  });
});
