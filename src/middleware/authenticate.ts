import { FastifyReply, FastifyRequest } from 'fastify';
import { clearAuthCookies, setAccessTokenCookie } from '@/auth/auth.cookies';
import { createAccessToken, verifyAccessToken, verifyRefreshToken } from '@/auth/auth.tokens';
import { findSessionById } from '@/auth/auth.repository';
import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/auth/auth.constants';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE];

  try {
    const payload = verifyAccessToken(accessToken);
    req.user = { userId: payload.userId };
    return;
  } catch (error) {

    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

    try {
      const payload = verifyRefreshToken(refreshToken);

      const existedSession = await findSessionById(payload.sessionId);

      if (!existedSession || !refreshToken) {
        clearAuthCookies(reply);
        return reply.code(401).send({ message: 'Unauthorized' });
      }

      const sessionExpired = existedSession.expiresAt < new Date(Date.now());
      const isSessionHashValid = await bcrypt.compare(existedSession.refreshTokenHash, refreshToken);

      if (!isSessionHashValid || sessionExpired) {
        clearAuthCookies(reply);
        return reply.code(401).send({ message: 'Unauthorized' });
      }

      const newAccessToken = createAccessToken({
        userId: payload.userId,
      });

      setAccessTokenCookie(reply, newAccessToken);

      req.user = {
        userId: payload.userId,
      };

      return;
    } catch {
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  }
};