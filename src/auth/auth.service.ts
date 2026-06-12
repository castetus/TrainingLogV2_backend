import {
  findUserByEmail,
  insertUser,
  getUserPasswordHashById,
  findUserById,
  insertSession,
  findSessionById,
  deleteSession,
} from "./auth.repository";
import bcrypt from 'bcrypt';
import { Session, User, UserWithToken } from "./auth.types";
import { createAccessToken, createRefreshToken } from "./auth.tokens";
import crypto from 'node:crypto';
import { REFRESH_TOKEN_TTL_DAYS } from './auth.constants';

const createAuthSession = async (user: User): Promise<{ accessToken: string, refreshToken: string, session: Session }> => {
  const sessionId = crypto.randomUUID();

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id, sessionId });
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
  );

  const newSession = await insertSession({ userId: user.id, refreshTokenHash, expiresAt });

  return {
    accessToken,
    refreshToken,
    session: newSession,
  };
};

const register = async (data: {name: string, email: string, password: string }): Promise<UserWithToken | null> => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    return null;
  }
  const newUser = await insertUser(data.name, data.email, passwordHash);

  const { accessToken, refreshToken } = await createAuthSession(newUser);

  return {
    ...newUser,
    accessToken,
    refreshToken,
  };
};

const login = async (data: { login: string, password: string }): Promise<UserWithToken | null> => {
  const user = await findUserByEmail(data.login);
  if (!user) {
    return null;
  }

  const userPasswordHash = await getUserPasswordHashById(user.id);
  if (!userPasswordHash) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(data.password, userPasswordHash);
  if (!isPasswordValid) {
    return null;
  }

  const { accessToken, refreshToken } = await createAuthSession(user);

  return {
    ...user,
    accessToken,
    refreshToken,
  };
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await findUserById(id);
  if (!user) {
    return null;
  }
  return user;
};

const logoutUser = async (id: string) => {
  await deleteSession(id);
};

export const authService = {
  register,
  login,
  getUserById,
  logoutUser,
};