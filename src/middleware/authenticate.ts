import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload } from '@/auth/auth.types';
import { ACCESS_TOKEN_COOKIE } from '@/shared/constants';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const token = req.cookies[ACCESS_TOKEN_COOKIE];

  if (!token) {
    reply.code(401);
    throw new Error('Unauthorized test');
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    req.user = payload;
  } catch {
    reply.code(401);
    throw new Error('Unauthorized');
  }
};