import { findExercises, insertExercise } from './exercises.repository';
import { CreateExerciseRequest } from './exercises.types';

const getAllExercises = async () => {
  const result = await findExercises();
  return result;
};

const createExercise = async (req: CreateExerciseRequest) => {
  return await insertExercise(req);
};

export const exercisesService = {
  getAllExercises,
  createExercise,
};