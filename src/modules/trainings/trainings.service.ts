import { Training, TrainingCreateRequest } from "./trainings.types";

const createTraining = async (data: TrainingCreateRequest): Promise<Training> => {
  const newTraining = await insertTraining(data);
};



export const exercisesService = {
  // getExercises,
  // getExerciseById,
  // filterExercises,
  createTraining,
  // updateExercise,
  // deleteExercise,
};