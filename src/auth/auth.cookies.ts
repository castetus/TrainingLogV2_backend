import { FastifyReply } from "fastify";
import 'dotenv/config';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./auth.constants";

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
};

export function setAuthCookies(
  reply: FastifyReply,
  accessToken: string,
  refreshToken: string,
): void {
  setAccessTokenCookie(reply, accessToken);
  setRefreshTokenCookie(reply, refreshToken);
};