import { Type } from '@sinclair/typebox';

export const RegisterBodySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 1 }),
}, { $id: 'RegisterBody' });

export const LoginBodySchema = Type.Object({
  login: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 4 }),
}, { $id: 'LoginBody' });

export const UserResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  created_at: Type.String(),
}, { $id: 'UserResponse' });

export const UserWithTokenResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  created_at: Type.String(),
  accessToken: Type.String(),
  refreshToken: Type.String(),
}, { $id: 'UserWithTokenResponse' });

export const LoginResponseSchema = Type.Object({
  data: Type.Object({
    user: UserWithTokenResponseSchema,
  }, { $id: 'LoginResponseData' }),
}, { $id: 'LoginResponse' });

export const RegisterResponseSchema = Type.Object({
  data: UserWithTokenResponseSchema,
}, { $id: 'RegisterResponse' });

export const CurrentUserResponseSchema = Type.Object({
  data: UserResponseSchema,
}, { $id: 'CurrentUserResponse' });

export const GoogleCallbackQuerySchema = Type.Object({
  code: Type.String(),
  state: Type.String(),
}, { $id: 'GoogleCallbackQuery' });
