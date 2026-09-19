import { Type } from '@sinclair/typebox';
import { createApiResponseSchema } from '@/shared/schemas';
import { ExerciseTypeSchema } from '../exercices/exercise.schemas';

export const TrainingParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
}, { $id: 'TrainingParams' });

export const TrainingExerciseRequestSchema = Type.Object({
  exerciseId: Type.String(),
  position: Type.Number(),
  plannedSets: Type.Integer({ minimum: 1 }),
  plannedReps: Type.Optional(Type.Number()),
  plannedWeight: Type.Optional(Type.Number()),
  plannedTime: Type.Optional(Type.Number()),
}, { $id: 'TrainingExerciseRequest' });

export const CreateTrainingBodySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  exercises: Type.Array(TrainingExerciseRequestSchema),
}, { $id: 'CreateTrainingBody' });

export const UpdateTrainingBodySchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.Optional(Type.String({ minLength: 1 })),
  exercises: Type.Optional(Type.Array(TrainingExerciseRequestSchema)),
}, { $id: 'UpdateTrainingBody' });

export const TrainingResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  userId: Type.String({ format: 'uuid' }),
}, { $id: 'TrainingResponse' });

export const TrainingExerciseForWorkoutSchema = Type.Object({
  userExerciseConfigId: Type.String({ format: 'uuid' }),
  exerciseId: Type.String({ format: 'uuid' }),
  exerciseName: Type.String(),
  exerciseType: ExerciseTypeSchema,
  position: Type.Number(),
  plannedSets: Type.Number(),
  plannedReps: Type.Optional(Type.Number()),
  plannedWeight: Type.Optional(Type.Number()),
  plannedTime: Type.Optional(Type.Number()),
}, { $id: 'TrainingExerciseForWorkout' });

export const TrainingDetailsResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  exercises: Type.Array(TrainingExerciseForWorkoutSchema),
}, { $id: 'TrainingDetailsResponse' });

export const TrainingListResponseSchema = createApiResponseSchema(
  Type.Array(TrainingResponseSchema),
  { $id: 'TrainingListResponse' },
);

export const TrainingDetailsApiResponseSchema = createApiResponseSchema(
  TrainingDetailsResponseSchema,
  { $id: 'TrainingDetailsApiResponse' },
);

export const TrainingApiResponseSchema = createApiResponseSchema(
  TrainingResponseSchema,
  { $id: 'TrainingApiResponse' },
);
