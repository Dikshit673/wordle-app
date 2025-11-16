import crypto from 'crypto';
import { EnvVars } from './EnvVars.js';

const { WORD_SECRET } = EnvVars;

// derive 32 byte key from secret
function deriveKey(secret: string) {
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * encrypt returns base64(iv(12) | tag(16) | ciphertext)
 */
export function encryptWord(plain: string) {
  const key = deriveKey(WORD_SECRET);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString('base64');
}

/**
 * decrypt expects base64(iv|tag|ciphertext)
 * (server does NOT call decrypt in this flow)
 */
export function decryptWord(encoded: string) {
  const key = deriveKey(WORD_SECRET);
  const data = Buffer.from(encoded, 'base64');
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const ciphertext = data.subarray(28);

  console.log({ iv, tag, ciphertext });
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString('utf8');
  return plaintext;
}
