import { pool } from '@/db/pool';
import { Session, User, UserEntity } from './auth.types';

export async function insertUser(name: string, email: string, passwordHash: string): Promise<User> {
  const result = await pool.query(
    `
    INSERT INTO users (
      name,
      login,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      login,
      created_at;
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
};

export async function findUserByEmail(login: string): Promise<UserEntity | null> {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      login,
      created_at
    FROM users
    WHERE login = $1;
    `,
    [login],
  );
  return result.rows[0] || null;
};

export async function getUserPasswordHashById(userId: string): Promise<string | null> {
  const result = await pool.query(
    `
    SELECT password_hash
    FROM users
    WHERE id = $1;
    `,
    [userId],
  );
  return result.rows[0]?.password_hash || null;
};

export async function findUserById(userId: string): Promise<User | null> {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      login,
      created_at
    FROM users
    WHERE id = $1;
    `,
    [userId],
  );
  return result.rows[0] || null;
};

export async function insertSession({ userId, refreshTokenHash, expiresAt }:
  { userId: string, refreshTokenHash: string, expiresAt: Date }): Promise<Session> {
  const result = await pool.query(
    `    
    INSERT INTO sessions (
      user_id,
      refresh_token_hash,
      expires_at
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      user_id,
      refresh_token_hash,
      created_at
      expires_at;
    `,
    [userId, refreshTokenHash, expiresAt]
  );
  return result.rows[0];
};

export async function findSessionById (id: string): Promise<Session | null> {
  const result = await pool.query(
    `
      SELECT * FROM sessions
      WHERE id = $1;
    `,
    [id]
  );
  return result.rows[0] || null;
};

export async function deleteSession (id: string): Promise<Session | null> {
  const result = await pool.query(
    `
      DELETE
      FROM sessions
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
  return result.rows[0] || null;
};

export async function findUserByGoogleId (googleId: string): Promise<User | null> {
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE google_id = $1
    `,
    [googleId]
  );

  return result.rows[0] || null;
};

export async function insertGoogleUser ({ googleId, email, name }: { googleId: string, email: string, name: string }): Promise<User | null> {
  const result = await pool.query(
    `
    INSERT INTO users (
      google_id,
      login,
      name
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      login,
      created_at;
    `,
    [googleId, email, name],
  );

  return result.rows[0] || null;
};