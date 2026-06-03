import { pool } from '@/db/pool';
import { CreateExerciseRequest, Exercise } from './exercises.types';

export async function findExercises() {
  const result = await pool.query<Exercise>(
    'SELECT * FROM exercises',
  );

  return result.rows;
};

export async function findExerciseById(
  id: string,
): Promise<Exercise | null> {
  const result = await pool.query<Exercise>(
    `
      SELECT *
      FROM exercises
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function filterExercisesByName(
  searchString: string,
): Promise<Exercise[]> {
  const result = await pool.query<Exercise>(
    `
      SELECT *
      FROM exercises
      WHERE name ILIKE $1
      LIMIT 10
    `,
    [searchString],
  );

  return result.rows;
}

export async function insertExercise(params: CreateExerciseRequest) {
  const result = await pool.query<Exercise>(
    `
    INSERT INTO exercises (
      name,
      description,
      type
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [params.name, params.description, params.type],
  );

  return result.rows[0];
};