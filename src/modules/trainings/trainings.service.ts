import { insertTraining, getAllTrainings, findTrainingById, patchTraining, removeTraining } from "./trainings.repository";
import { Training, TrainingCreateRequest, TrainingDetailsResponse, TrainingUpdateRequest } from "./trainings.types";

const getTrainings = async (userId: string): Promise<Training[]> => {
  const result = await getAllTrainings(userId);

  return result;
};

const getTrainingById = async ({ trainingId, userId }: { trainingId: string, userId: string }): Promise<TrainingDetailsResponse | null> => {
  const result = await findTrainingById({ trainingId, userId });

  if (!result) {
    return null;
  }

  const training = result.reduce((acc, item) => {
    if (!acc.name) {
      acc.name = item.trainingName;
    }
    const {
      exerciseId, exerciseName, exerciseType, position
    } = item;
    acc.exercises.push({
      exerciseId,
      exerciseName,
      exerciseType,
      position,
      plannedSets: item.plannedSets ?? undefined,
      plannedReps: item.plannedReps ?? undefined,
      plannedWeight: item.plannedWeight ?? undefined,
      plannedTime: item.plannedTime ?? undefined,
    });
    return acc;
  }, {} as TrainingDetailsResponse);

  return training;
};

const createTraining = async ({ data, userId }: { data: TrainingCreateRequest, userId: string }): Promise<Training> => {
  const newTraining = await insertTraining({
    userId,
    name: data.name,
    exercises: data.exercises,
  });

  if (!newTraining) {
    throw new Error('Can not create training');
  }

  return newTraining;
};

const updateTraining = async ({ data, userId }: { data: TrainingUpdateRequest, userId: string }) => {

};

const deleteTraining = async (id: string) => {

};

export const trainingService = {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
};