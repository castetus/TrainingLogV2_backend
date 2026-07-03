import type { Static } from '@sinclair/typebox';
import {
  TrainingParamsSchema,
  TrainingResponseSchema,
  TrainingListResponseSchema,
  TrainingDetailsResponseSchema,
  TrainingExerciseForWorkoutSchema,
  CreateTrainingBodySchema,
  UpdateTrainingBodySchema,
  TrainingExerciseRequestSchema,
} from "./training.schemas";

type BaseUserExerciseConfig = {
  id: string;
  exerciseId: string;
  userId: string;
  isArchived: boolean;
};

export type UserExerciseConfig = BaseUserExerciseConfig & ({
  exerciseType: 'weight';
  plannedReps: number;
  plannedSets: number;
  plannedWeight: number;
} | {
  exerciseType: 'time';
  plannedTime: number;
} | {
  exerciseType: 'base';
  plannedReps: number;
});

export type TrainingExercise = {
  id: string;
  trainingId: string;
  userExerciseConfigId: string;
  order: string;
}

export type Training = {
  id: string;
  name: string;
  userId: string;
}

export type TrainingExerciseRequest = Static<typeof TrainingExerciseRequestSchema>;

export type TrainingCreateRequest = Static<typeof CreateTrainingBodySchema>;

export type TrainingUpdateRequest = Static<typeof UpdateTrainingBodySchema>;

export type TrainingForWorkout = Static<typeof TrainingDetailsResponseSchema>;

export type TrainingDetailsResponse = TrainingForWorkout;

export type GetTrainingParams = Static<typeof TrainingParamsSchema>;

export type TrainingResponseDto = Static<typeof TrainingResponseSchema>;

export type TrainingListResponseDto = Static<typeof TrainingListResponseSchema>;

export type TrainingExerciseForWorkoutDto = Static<typeof TrainingExerciseForWorkoutSchema>;