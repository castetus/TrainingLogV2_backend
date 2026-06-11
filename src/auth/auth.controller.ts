import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequest, RegisterRequest } from "./auth.types";
import { authService } from "./auth.service";
import 'dotenv/config';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/auth/auth.cookies";

export const getCurrentUser = async (req: FastifyRequest, res: FastifyReply) => {
  const user = await authService.getUserById(req.user.userId);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  return res.send({ data: user });
};

export const register = async (req: FastifyRequest<{ Body: RegisterRequest }>, res: FastifyReply) => {
  const { name, email, password } = req.body;
  const newUser = await authService.register({ name, email, password });
  if (!newUser) {
    return res.status(409).send({ message: 'User with this email already exists' });
  }
  return res.send({ data: newUser });
};

export const login = async (req: FastifyRequest<{ Body: LoginRequest }>, res: FastifyReply) => {
  const { login, password } = req.body;
  const user = await authService.login({ login, password });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  return res
    .setCookie(ACCESS_TOKEN_COOKIE, user.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
    })
    .setCookie(REFRESH_TOKEN_COOKIE, user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    })
    .send({ data: { user } });
}

export const logout = async (req: FastifyRequest, res: FastifyReply) => {
  return res
    .clearCookie(ACCESS_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .clearCookie(REFRESH_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .send({ message: 'Logged out successfully' });
};

export const checkRefreshToken = async (req: FastifyRequest, res: FastifyReply) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

  if (!refreshToken) {
    return res.status(401).send({ message: 'No refresh token provided' });
  }
};