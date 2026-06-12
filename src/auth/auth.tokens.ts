import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { JwtPayload } from './auth.types';

export const createAccessToken = (payload: { userId: string }) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
};

export const createRefreshToken = (payload: { userId: string, sessionId: string }) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });
};

export const verifyAccessToken = (token: string | undefined): JwtPayload => {
  if (!token) {
    throw new Error('Token not provided');
  }
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
};

export const verifyRefreshToken = (token: string | undefined): JwtPayload => {
  if (!token) {
    throw new Error('Token not provided');
  }
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
};
