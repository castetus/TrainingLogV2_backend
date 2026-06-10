import { FastifyInstance } from "fastify";
import { getCurrentUser, register, login } from "./auth.controller";
import { registerUserDto } from "./dto/register-user.dto";
import { loginDto } from "./dto/login.dto";

export function authRoutes (app: FastifyInstance) {
  app.post('/auth/register', { schema: registerUserDto }, register);
  app.post('/auth/login', { schema: loginDto }, login);
  app.get('/auth/me', getCurrentUser);
};