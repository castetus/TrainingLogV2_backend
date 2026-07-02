import { insertTraining, getAllTrainings, findTrainingById, patchTraining, removeTraining } from "./trainings.repository";
import { Training, TrainingCreateRequest, TrainingDetailsResponse, TrainingForWorkout, TrainingUpdateRequest } from "./trainings.types";

const getTrainings = async (userId: string): Promise<Training[]> => {
  const result = await getAllTrainings(userId);

  return result;
};

const getTrainingById = async ({ trainingId, userId }: { trainingId: string, userId: string }): Promise<TrainingForWorkout | null> => {
  const result = await findTrainingById({ trainingId, userId });

  if (!result) {
    return null;
  }

  const training = result.reduce((acc, item) => {
    if (!acc.name) {
      acc.name = item.trainingName;
    }
    if (!acc.id) {
      acc.id = item.trainingId;
    }
    const {
      exerciseId, exerciseName, exerciseType, position, userExerciseConfigId
    } = item;
    if (!acc.exercises) {
      acc.exercises = [];
    }
    acc.exercises.push({
      userExerciseConfigId,
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
  }, {} as TrainingForWorkout);

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
  const updatedTraining = await patchTraining({ data, userId });

  if (!updatedTraining) {
    throw new Error('Can not update training');
  }

  return updateTraining;
};

const deleteTraining = async ({ trainingId, userId }: { trainingId: string; userId: string }) => {
  await removeTraining({ trainingId, userId });
};

export const trainingService = {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
};