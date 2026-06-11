import { FastifyInstance } from "fastify";
import { getCurrentUser, register, login, logout, checkRefreshToken } from "./auth.controller";
import { registerUserDto } from "./dto/register-user.dto";
import { loginDto } from "./dto/login.dto";
import { authenticate } from "@/middleware/authenticate";

export function authRoutes (app: FastifyInstance) {
  app.post('/auth/register', { schema: registerUserDto }, register);
  app.post('/auth/login', { schema: loginDto }, login);
  app.get('/auth/me', { preHandler: [authenticate] }, getCurrentUser);
  app.post('/auth/logout', logout);
  app.post('/auth/refresh', checkRefreshToken);
};