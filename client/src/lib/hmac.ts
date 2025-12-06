import { EnvVars } from '@/utils/EnvVars';

export async function createHmacSignature(
  body: object,
  path: string = '/auth/init'
): Promise<{ signature: string; timestamp: string }> {
  // Get the HMAC secret from the environment variables
  const hmacSecret = EnvVars.VITE_HMAC_SECRET;

  // Create a TextEncoder to encode the HMAC secret
  const textEncoder = new TextEncoder();
  const keyData = textEncoder.encode(hmacSecret);

  // Import the HMAC secret key
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Get the current timestamp
  const timestamp = Date.now().toString();

  // Create the message to be signed
  const message = JSON.stringify(body || {}) + timestamp + path;

  // Sign the message with the HMAC secret key
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    textEncoder.encode(message)
  );

  // Convert the signature buffer to a hexadecimal string
  const signatureHex = [...new Uint8Array(signatureBuffer)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Return the HMAC signature and the timestamp
  return { signature: signatureHex, timestamp };
}
