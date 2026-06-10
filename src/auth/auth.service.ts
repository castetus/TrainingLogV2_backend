import { findUserByEmail, insertUser } from "./auth.repository";
import bcrypt from 'bcrypt';
import { User } from "./auth.types";

const register = async (data: {name: string, email: string, password: string }): Promise<User | null> => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    return null;
  }
  const newUser = await insertUser(data.name, data.email, passwordHash);
  return newUser;
};

const login = async (data: { login: string, password: string }): Promise<User | null> => {
  const user = await findUserByEmail(data.login);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isPasswordValid) {
    return null;
  }

  return user;
};

export const authService = {
  register,
  login,
};