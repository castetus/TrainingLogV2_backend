import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/auth/auth.cookies';
import { createAccessToken, verifyAccessToken, verifyRefreshToken } from '@/auth/auth.tokens';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE];

  try {
    const payload = verifyAccessToken(accessToken);
    req.user = { userId: payload.userId };
    return;
  } catch (error) {
    // console.log('Access token error:', error, error instanceof jwt.TokenExpiredError);
    // if (!(error instanceof jwt.TokenExpiredError)) {
    //   return reply.code(401).send({ message: 'Unauthorized' });
    // }

    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

    try {
      const payload = verifyRefreshToken(refreshToken);

      const newAccessToken = createAccessToken({
        userId: payload.userId,
      });

      reply.setCookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });

      req.user = {
        userId: payload.userId,
      };

      return;
    } catch {
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  }
};