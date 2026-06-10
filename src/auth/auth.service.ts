import { findUserByEmail, insertUser } from "./auth.repository";
import bcrypt from 'bcrypt';
import { User, UserWithToken } from "./auth.types";
import jwt from 'jsonwebtoken';

const register = async (data: {name: string, email: string, password: string }): Promise<User | null> => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    return null;
  }
  const newUser = await insertUser(data.name, data.email, passwordHash);
  return newUser;
};

const login = async (data: { login: string, password: string }): Promise<UserWithToken | null> => {
  const user = await findUserByEmail(data.login);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  return {
    ...user,
    token,
  };
};

export const authService = {
  register,
  login,
};