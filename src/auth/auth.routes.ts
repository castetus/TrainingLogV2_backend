import { FastifyInstance } from "fastify";
import { getCurrentUser, register, login, logout, checkRefreshToken, redirectToGoogle, googleCallback } from "./auth.controller";
import {
  RegisterBodySchema,
  LoginBodySchema,
  RegisterResponseSchema,
  LoginResponseSchema,
  CurrentUserResponseSchema,
  GoogleCallbackQuerySchema,
} from "./auth.schemas";
import { authenticate } from "@/middleware/authenticate";

export function authRoutes (app: FastifyInstance) {
  app.post('/auth/register', {
    schema: {
      tags: ['auth'],
      body: RegisterBodySchema,
      response: {
        200: RegisterResponseSchema,
      },
    },
  }, register);

  app.post('/auth/login', {
    schema: {
      tags: ['auth'],
      body: LoginBodySchema,
      response: {
        200: LoginResponseSchema,
      },
    },
  }, login);

  app.get('/auth/me', {
    schema: {
      tags: ['auth'],
      response: {
        200: CurrentUserResponseSchema,
      },
    },
    preHandler: [authenticate],
  }, getCurrentUser);

  app.post('/auth/logout', { schema: { tags: ['auth'] } }, logout);
  app.post('/auth/refresh', { schema: { tags: ['auth'] } }, checkRefreshToken);
  app.get('/auth/google', { schema: { tags: ['auth'] } }, redirectToGoogle);

  app.get('/auth/google/callback', {
    schema: {
      tags: ['auth'],
      querystring: GoogleCallbackQuerySchema,
    },
  }, googleCallback);
};
