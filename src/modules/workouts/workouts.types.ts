import { ExerciseType } from "@/shared/types";
import { Static } from '@sinclair/typebox';
import { WorkoutBaseResponseSchema, WorkoutListResponseSchema, WorkoutSetResultResponseSchema, WorkoutExerciseResultResponseSchema, WorkoutDetailsResponseSchema } from "./workout.schemas";

export enum WorkoutStatus {
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
};

export type Workout = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  status: WorkoutStatus;
  durationMs: number;
  trainingId: string;
};

export type GetWorkoutByIdParams = {
  workoutId: string;
}

export type CreateWorkoutRequest = Pick<Workout, 'trainingId' | 'name'>;

export type UpdateWorkoutRequest = Partial<Pick<Workout, 'status' | 'durationMs'>>;

export type WorkoutDetailsRow = {
  workoutId: string;
  workoutName: string;
  status: WorkoutStatus;
  durationMs: number;
  trainingId: string;

  userExerciseConfigId: string;
  workoutExerciseResultId: string;
  position: number;

  exerciseId: string;
  exerciseName: string;
  exerciseType: string;

  workoutSetResultId: string;
  setNumber: number;
  reps: number | null;
  weightKg: number | null;
  durationSeconds: number | null;
  isCompleted: boolean;
};

export type WorkoutDetails = {
  id: string;
  name: string;
  status: WorkoutStatus;
  durationMs: number;
  trainingId: string;
  exercises: WorkoutExerciseDetails[];
};

export type WorkoutExerciseDetails = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;
  userExerciseConfigId: string;
  position: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
  sets: WorkoutSetDetails[];
};

export type WorkoutSetDetails = {
  id: string;
  setNumber: number;
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  isCompleted: boolean;
};

///

export type WorkoutBaseResponseDto = Static<typeof WorkoutBaseResponseSchema>;

export type WorkoutListResponseDto = Static<typeof WorkoutListResponseSchema>;

export type WorkoutSetResultResponseDto =
  Static<typeof WorkoutSetResultResponseSchema>;

export type WorkoutExerciseResultResponseDto =
  Static<typeof WorkoutExerciseResultResponseSchema>;

export type WorkoutDetailsResponseDto =
  Static<typeof WorkoutDetailsResponseSchema>;