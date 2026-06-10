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
    [`%${searchString}%`],
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

export async function patchExercise(id: string, params: CreateExerciseRequest) {
  const result = await pool.query<Exercise>(
    `
      UPDATE INTO exercises
      SET
        name = $1,
        description = $2,
        type = $3,
        updated_at = now()
        WHERE id = $4
        RETURNING *
    `,
    [
      params.name,
      params.description,
      params.type,
      id,
    ],
  )
};

export async function removeExercise(
  id: string,
): Promise<Exercise | null> {
  const result = await pool.query(
    `
      DELETE
      FROM exercises
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] ?? null;
};