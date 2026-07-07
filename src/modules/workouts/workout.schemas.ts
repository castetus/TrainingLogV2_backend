import { Type } from '@sinclair/typebox';
import { createApiResponseSchema } from '@/shared/schemas';

export const WorkoutParamsSchema = Type.Object({
  workoutId: Type.String({ format: 'uuid' }),
}, { $id: 'WorkoutParams' });

export const WorkoutStatusSchema = Type.Union([
  Type.Literal('in_progress'),
  Type.Literal('paused'),
  Type.Literal('finished'),
  Type.Literal('cancelled'),
], { $id: 'WorkoutStatus' });

export const WorkoutBaseResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  trainingId: Type.String({ format: 'uuid' }),
  name: Type.String(),
  status: WorkoutStatusSchema,
  durationMs: Type.Number(),
}, { $id: 'WorkoutBaseResponse' });

export const WorkoutSetResultResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  setNumber: Type.Number(),
  reps: Type.Optional(Type.Number()),
  weight: Type.Optional(Type.Number()),
  time: Type.Optional(Type.Number()),
  isCompleted: Type.Boolean(),
}, { $id: 'WorkoutSetResultResponse' });

export const WorkoutExerciseResultResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  userExerciseConfigId: Type.String({ format: 'uuid' }),
  exerciseId: Type.String({ format: 'uuid' }),
  exerciseName: Type.String(),
  order: Type.Number(),
  sets: Type.Array(WorkoutSetResultResponseSchema),
}, { $id: 'WorkoutExerciseResultResponse' });

export const WorkoutDetailsResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  trainingId: Type.String({ format: 'uuid' }),
  workoutName: Type.String(),
  status: WorkoutStatusSchema,
  durationMs: Type.Number(),
  exercises: Type.Array(WorkoutExerciseResultResponseSchema),
}, { $id: 'WorkoutDetailsResponse' });

export const WorkoutListMetaSchema = Type.Object({
  total: Type.Number(),
}, { $id: 'WorkoutListMeta' });

export const WorkoutListResponseSchema = createApiResponseSchema(
  Type.Array(WorkoutBaseResponseSchema),
  { $id: 'WorkoutListResponse', meta: WorkoutListMetaSchema },
);

export const WorkoutApiResponseSchema = createApiResponseSchema(
  WorkoutBaseResponseSchema,
  { $id: 'WorkoutApiResponse' },
);

export const WorkoutDetailsApiResponseSchema = createApiResponseSchema(
  WorkoutDetailsResponseSchema,
  { $id: 'WorkoutDetailsApiResponse' },
);

export const CreateWorkoutBodySchema = Type.Object({
  name: Type.String(),
  trainingId: Type.String({ format: 'uuid' }),
}, { $id: 'CreateWorkoutBody' });
