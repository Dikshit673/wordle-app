import { EnvVars } from '../utils/EnvVars';

const { VITE_WORD_SECRET } = EnvVars;

// derive 32-byte key using SHA-256
async function deriveKey(secret: string) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData); // 32 bytes

  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}

// encrypt returns base64(iv(12) | tag(16) | ciphertext)
export async function encryptWord(plain: string) {
  const key = await deriveKey(VITE_WORD_SECRET);

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const enc = new TextEncoder();
  const encoded = enc.encode(plain);

  const buf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  // GCM output = ciphertext || tag (last 16 bytes)
  const bytes = new Uint8Array(buf);
  const ciphertext = bytes.slice(0, bytes.length - 16);
  const tag = bytes.slice(bytes.length - 16);

  // concat iv | tag | ciphertext
  const final = new Uint8Array(iv.length + tag.length + ciphertext.length);
  final.set(iv, 0);
  final.set(tag, iv.length);
  final.set(ciphertext, iv.length + tag.length);

  return btoa(String.fromCharCode(...final));
}

export async function decryptWord(encoded: string) {
  const key = await deriveKey(VITE_WORD_SECRET);

  const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));

  const iv = bytes.slice(0, 12);
  const tag = bytes.slice(12, 28);
  const ciphertext = bytes.slice(28);

  // WebCrypto expects ciphertext||tag
  const combined = new Uint8Array(ciphertext.length + tag.length);
  combined.set(ciphertext, 0);
  combined.set(tag, ciphertext.length);

  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    combined
  );

  return new TextDecoder().decode(plainBuf);
}
