import { pool } from '@/db/pool';
import { User, UserEntity } from './auth.types';

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