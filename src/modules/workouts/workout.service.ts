import { ExerciseType, WorkoutAction } from '@/shared/types';
import type { Workout, CreateWorkoutRequest, WorkoutDetails } from './workouts.types';
import { WorkoutStatus } from './workouts.types';
import crypto from 'node:crypto';
import { findWorkoutById, updateWorkoutStatus, getWorkouts, insertWorkout, getWorkoutDetailRows } from './workout.repository';
import { trainingService } from '../trainings/trainings.service';
import { buildWorkoutDetails } from './workout.utils';

const workouts: Workout[] = [];

const getAllWorkouts = async (userId: string): Promise<Workout[]> => {
  return await getWorkouts(userId);
};

const createWorkout = async ({ data, userId }: { data: CreateWorkoutRequest, userId: string }) => {
  const { trainingId, name } = data;
  const trainingForWorkout = await trainingService.getTrainingById({ trainingId, userId });

  if (!trainingForWorkout) {
    throw new Error('Can not find training');
  }

  const result = await insertWorkout({
    name,
    userId,
    training: trainingForWorkout,
  });

  return result;
};

const getWorkoutById = ({ workoutId, userId }: { workoutId: string, userId: string }): Promise<Workout | undefined> => {
  return findWorkoutById({ workoutId, userId });
};

const getWorkoutDetails = async ({ workoutId, userId }: { workoutId: string, userId: string }): Promise<WorkoutDetails> => {
  const rows = await getWorkoutDetailRows({ workoutId, userId });

  if (!rows || !rows.length) {
    throw new Error('Workout not found');
  }

  return buildWorkoutDetails(rows);
};

// const updateWorkout = (id: string, updatedWorkout: Partial<Workout>): Workout | undefined => {
//   const workoutIndex = workouts.findIndex(workout => workout.id === id);
//   if (workoutIndex === -1) {
//     return undefined;
//   }
//   workouts[workoutIndex] = { ...workouts[workoutIndex], ...updatedWorkout };
//   return workouts[workoutIndex];
// };

const transitionWorkout = async ({
  workoutId,
  userId,
  action,
  durationMs,
}: {
  workoutId: string;
  userId: string;
  action: WorkoutAction;
  durationMs?: number;
}): Promise<Workout> => {
  const workout = await findWorkoutById({ workoutId, userId });

  if (!workout) {
    throw new Error('Can not find workout');
  }

  switch (action) {
    case 'pause': {
      if (workout.status !== WorkoutStatus.IN_PROGRESS) {
        throw new Error('Only in-progress workout can be paused');
      }

      return updateWorkoutStatus({
        workoutId,
        userId,
        status: WorkoutStatus.PAUSED,
        durationMs,
      });
    }

    case 'resume': {
      if (workout.status !== WorkoutStatus.PAUSED) {
        throw new Error('Only paused workout can be resumed');
      }

      return updateWorkoutStatus({
        workoutId,
        userId,
        status: WorkoutStatus.IN_PROGRESS,
      });
    }

    case 'finish': {
      if (
        workout.status === WorkoutStatus.CANCELLED ||
        workout.status === WorkoutStatus.FINISHED
      ) {
        throw new Error('Workout can not be finished');
      }

      return updateWorkoutStatus({
        workoutId,
        userId,
        status: WorkoutStatus.FINISHED,
        durationMs,
      });
    }

    case 'cancel': {
      if (workout.status === WorkoutStatus.FINISHED) {
        throw new Error('Finished workout can not be cancelled');
      }

      return updateWorkoutStatus({
        workoutId,
        userId,
        status: WorkoutStatus.CANCELLED,
      });
    }

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
};

const deleteWorkout = (id: string): boolean => {
  const workoutIndex = workouts.findIndex(workout => workout.id === id);
  if (workoutIndex === -1) {
    return false;
  }
  workouts.splice(workoutIndex, 1);
  return true;
};

export const workoutService = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  transitionWorkout,
  deleteWorkout,
  getWorkoutDetails,
};