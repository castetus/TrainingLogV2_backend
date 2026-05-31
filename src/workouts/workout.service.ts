import { Workout } from "./workouts.types";

const workouts: Workout[] = [];

const getAllWorkouts = (): Workout[] => {
  return workouts;
};

const createWorkout = (workout: Workout): Workout => {
  workouts.push(workout);
  return workout;
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