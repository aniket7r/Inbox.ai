import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// Generate a secure 32-byte key
const key = crypto.createHash('sha256')
                  .update(String(process.env.ENCRYPTION_KEY))
                  .digest('base64')
                  .substr(0, 32);

// Function to encrypt the token
export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(16);  // 16-byte IV for AES
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;  // Concatenate IV and encrypted text
}

// Function to decrypt the token
export function decryptToken(encryptedToken: string): string {
  const [ivHex, encrypted] = encryptedToken.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Middleware to store the access token
let storedEncryptedToken: string | null = null;

export function storeAccessToken(token: string) {
  console.log('Storing access token:', token);
  storedEncryptedToken = encryptToken(token);
}

export function getAccessToken(): string | null {
  return storedEncryptedToken ? decryptToken(storedEncryptedToken) : null;
}
