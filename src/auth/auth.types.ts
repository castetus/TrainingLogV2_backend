export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type UserEntity = User & {
  password_hash: string;
};

export type UserWithToken = User & {
  token: string;
  refreshToken: string;
};

export type JwtPayload = {
  userId: string;
};