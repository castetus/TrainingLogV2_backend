import { FastifyInstance } from "fastify";
import { getCurrentUser } from "./auth.controller";

export function authRoutes (app: FastifyInstance) {
  app.post('/auth/register', register);
  app.post('/auth/login', login);
  app.get('/auth/me',
    { preHandler: [app.authenticate] },
    getCurrentUser
  );
}