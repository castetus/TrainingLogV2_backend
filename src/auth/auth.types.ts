import type { Static } from '@sinclair/typebox';
import {
  RegisterBodySchema,
  LoginBodySchema,
  UserResponseSchema,
  UserWithTokenResponseSchema,
  GoogleCallbackQuerySchema,
} from './auth.schemas';

export type RegisterRequest = Static<typeof RegisterBodySchema>;

export type LoginRequest = Static<typeof LoginBodySchema>;

export type User = Static<typeof UserResponseSchema>;

export type UserEntity = User & {
  password_hash: string;
};

export type UserWithToken = Static<typeof UserWithTokenResponseSchema>;

export type JwtPayload = {
  userId: string;
  sessionId: string;
};

export type Session = {
  id: string;
  userId: string;
  refreshTokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}

export type GoogleCallbackQuery = Static<typeof GoogleCallbackQuerySchema>;