import { FastifyReply } from "fastify";
import 'dotenv/config';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export function setAccessTokenCookie(reply: FastifyReply, token: string) {
  reply.setCookie(ACCESS_TOKEN_COOKIE, token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60,
  });
};

export function setRefreshTokenCookie(reply: FastifyReply, token: string) {
  reply.setCookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function clearAuthCookies(reply: FastifyReply) {
  reply.clearCookie(ACCESS_TOKEN_COOKIE);
  reply.clearCookie(REFRESH_TOKEN_COOKIE);
}