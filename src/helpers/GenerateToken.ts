import { SignJWT } from 'jose';
import { User } from '../db/schema/user';

export async function generateAccessToken(user: User) {
  const jwt = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
    .setSubject(user.firebase_uid)
    .setIssuedAt(Math.floor(Date.now() / 1000))
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return jwt;
}
