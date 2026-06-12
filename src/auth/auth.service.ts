import { findUserByEmail, insertUser, getUserPasswordHashById, findUserById } from "./auth.repository";
import bcrypt from 'bcrypt';
import { User, UserWithToken } from "./auth.types";
import { createAccessToken, createRefreshToken } from "./auth.tokens";

const register = async (data: {name: string, email: string, password: string }): Promise<UserWithToken | null> => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    return null;
  }
  const newUser = await insertUser(data.name, data.email, passwordHash);

  const accessToken = createAccessToken({ userId: newUser.id });
  const refreshToken = createRefreshToken({ userId: newUser.id });

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

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id });

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

export const authService = {
  register,
  login,
  getUserById,
};