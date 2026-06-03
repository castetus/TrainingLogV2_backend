import { pool } from '@/db/pool';
import { CreateExerciseRequest, Exercise } from './exercises.types';

export async function findExercises() {
  const result = await pool.query<Exercise>(
    'SELECT * FROM exercises',
  );

  return result.rows;
};

export async function createExercise() {
  const result = await pool.query(
    'INSERT '
  )
};

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