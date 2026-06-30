import { WorkoutAction } from '@/shared/types';
import type { Workout, CreateWorkoutRequest } from './workouts.types';
import { WorkoutStatus } from './workouts.types';
import crypto from 'node:crypto';
import { findWorkoutById, updateWorkoutStatus, getWorkouts } from './workout.repository';

const workouts: Workout[] = [];

const getAllWorkouts = async (userId: string): Promise<Workout[]> => {
  return await getWorkouts(userId);
};

const createWorkout = (data: CreateWorkoutRequest): Workout => {

  const newWorkout: Workout = {
    id: crypto.randomUUID(),
    name: 'New Workout',
    createdAt: new Date(),
    trainingId: data.trainingId,
    userId: 'user123',
    status: WorkoutStatus.IN_PROGRESS,
    durationMs: 0,
  };

  workouts.unshift(newWorkout);
  return newWorkout;
};

const getWorkoutById = (id: string): Workout | undefined => {
  return workouts.find(workout => workout.id === id);
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
};