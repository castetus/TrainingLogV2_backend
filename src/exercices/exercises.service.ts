import { findExercises, insertExercise, filterExercisesByName } from './exercises.repository';
import { CreateExerciseRequest } from './exercises.types';

const getAllExercises = async () => {
  const result = await findExercises();
  return result;
};

const createExercise = async (req: CreateExerciseRequest) => {
  return await insertExercise(req);
};

const filterExercises = async (searchString: string) => {
  return await filterExercisesByName(searchString);
};

const updateExercise = async (id: string, params: CreateExerciseRequest) => {
  return await updateExercise(id, params);
};

export const exercisesService = {
  getAllExercises,
  filterExercises,
  createExercise,
  updateExercise,
};