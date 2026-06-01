import type { Workout, CreateWorkoutRequest} from './workouts.types';
import { WorkoutStatus } from './workouts.types';
import crypto from 'node:crypto';

const workouts: Workout[] = [];

const getAllWorkouts = (): Workout[] => {
  return workouts;
};

const createWorkout = (data: CreateWorkoutRequest): Workout => {

  const newWorkout: Workout = {
    id: crypto.randomUUID(),
    name: 'New Workout',
    date: new Date().toISOString(),
    trainingId: data.trainingId,
    userId: 'user123',
    status: WorkoutStatus.IN_PROGRESS,
    continuation: 0,
  };

  workouts.unshift(newWorkout);
  return newWorkout;
};

const getWorkoutById = (id: string): Workout | undefined => {
  return workouts.find(workout => workout.id === id);
};

const updateWorkout = (id: string, updatedWorkout: Partial<Workout>): Workout | undefined => {
  const workoutIndex = workouts.findIndex(workout => workout.id === id);
  if (workoutIndex === -1) {
    return undefined;
  }
  workouts[workoutIndex] = { ...workouts[workoutIndex], ...updatedWorkout };
  return workouts[workoutIndex];
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
  updateWorkout,
  deleteWorkout,
};