import type { Static } from '@sinclair/typebox';
import {
  ExerciseResponseSchema,
  ExerciseListResponseSchema,
  CreateExerciseBodySchema,
  GetExercisesQuerySchema,
  ExerciseParamsSchema,
} from './exercise.schemas';

export type Exercise = Static<typeof ExerciseResponseSchema>;

export type CreateExerciseRequest = Static<typeof CreateExerciseBodySchema>;

export type GetExercisesQuery = Static<typeof GetExercisesQuerySchema>;

export type ExerciseListResponseDto = Static<typeof ExerciseListResponseSchema>;

export type GetExerciseParams = Static<typeof ExerciseParamsSchema>;