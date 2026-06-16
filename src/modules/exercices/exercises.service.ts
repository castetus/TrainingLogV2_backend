import {
  findExercises,
  findExerciseById,
  insertExercise,
  filterExercisesByName,
  patchExercise,
  removeExercise,
} from './exercises.repository';
import { CreateExerciseRequest } from './exercises.types';

const getExercises = async ({ search }: { search: string }) => {

  if (search) {
    return await filterExercisesByName(search);
  }
  return await findExercises();
};

const getExerciseById = async (id: string) => {
  return await findExerciseById(id);
};

const createExercise = async (req: CreateExerciseRequest) => {
  return await insertExercise(req);
};

const filterExercises = async (searchString: string) => {
  return await filterExercisesByName(searchString);
};

const updateExercise = async (id: string, params: CreateExerciseRequest) => {
  return await patchExercise(id, params);
};

const deleteExercise = async (id: string) => {
  return await removeExercise(id);
}

export const exercisesService = {
  getExercises,
  getExerciseById,
  filterExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};