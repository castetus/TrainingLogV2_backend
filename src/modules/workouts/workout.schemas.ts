import { Type } from '@sinclair/typebox';

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
  workoutName: Type.String(),
  status: WorkoutStatusSchema,
  durationMs: Type.Number(),
}, { $id: 'WorkoutBaseResponse' });

export const WorkoutListResponseSchema = Type.Array(WorkoutBaseResponseSchema, {
  $id: 'WorkoutListResponse',
});

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

export const CreateWorkoutBodySchema = Type.Object({
  name: Type.String(),
  trainingId: Type.String({ format: 'uuid' }),
}, { $id: 'CreateWorkoutBody' });
