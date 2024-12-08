import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { TokenPayload } from '../shared/types/token-payload.js';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);

  return shaHasher.update(line).digest('hex');
};

export async function createJWT(algorithm: string, jwtSecret: string, payload: TokenPayload): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}
