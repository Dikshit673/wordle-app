const encoded = 'gSScDyel+xu93YaSVxA9Ww9pk/0VOV7HtmAYqynaznPx';
const secret =
  'b37ed697aa54065ecc6b57a0c5cb59372209a310a207341c766e21d3624d2808';

// Base64 → Uint8Array
function base64ToBytes(b64: string) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// UTF-8 encode text → Uint8Array
function strToBytes(str: string) {
  return new TextEncoder().encode(str);
}

// Uint8Array → UTF-8 string
function bytesToStr(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes);
}

// === DECODE BASE64 ===
const raw = base64ToBytes(encoded);

// === SPLIT IV | TAG | CIPHERTEXT ===
const iv = raw.slice(0, 12);
const tag = raw.slice(12, 28);
const ciphertext = raw.slice(28);

// WebCrypto wants ciphertext+tag appended
const ctPlusTag = new Uint8Array(ciphertext.length + tag.length);
ctPlusTag.set(ciphertext, 0);
ctPlusTag.set(tag, ciphertext.length);

// === Derive key using SHA-256(secret) ===
const keyMaterial = await crypto.subtle.digest('SHA-256', strToBytes(secret));

// Import as AES-GCM key
const cryptoKey = await crypto.subtle.importKey(
  'raw',
  keyMaterial,
  { name: 'AES-GCM' },
  false,
  ['decrypt']
);

// === DECRYPT ===
const decryptedBuffer = await crypto.subtle.decrypt(
  {
    name: 'AES-GCM',
    iv,
  },
  cryptoKey,
  ctPlusTag
);

const plaintext = bytesToStr(new Uint8Array(decryptedBuffer));

console.log('Decrypted:', plaintext);
