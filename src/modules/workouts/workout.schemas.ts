import { Type, Static } from '@sinclair/typebox';

export const WorkoutParamsSchema = Type.Object({
  workoutId: Type.String({ format: 'uuid' }),
});

export const WorkoutStatusSchema = Type.Union([
  Type.Literal('in_progress'),
  Type.Literal('paused'),
  Type.Literal('finished'),
  Type.Literal('cancelled'),
]);

export const WorkoutBaseResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  trainingId: Type.String({ format: 'uuid' }),
  workoutName: Type.String(),
  status: WorkoutStatusSchema,
  durationMs: Type.Number(),
});

export const WorkoutListResponseSchema = Type.Array(WorkoutBaseResponseSchema);

export const WorkoutSetResultResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  setNumber: Type.Number(),
  reps: Type.Optional(Type.Number()),
  weight: Type.Optional(Type.Number()),
  time: Type.Optional(Type.Number()),
  isCompleted: Type.Boolean(),
});

export const WorkoutExerciseResultResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  userExerciseConfigId: Type.String({ format: 'uuid' }),
  exerciseId: Type.String({ format: 'uuid' }),
  exerciseName: Type.String(),
  order: Type.Number(),
  sets: Type.Array(WorkoutSetResultResponseSchema),
});

export const WorkoutDetailsResponseSchema = Type.Intersect([
  WorkoutBaseResponseSchema,
  Type.Object({
    exercises: Type.Array(WorkoutExerciseResultResponseSchema),
  }),
]);

export const CreateWorkoutBodySchema = Type.Object({
  name: Type.String(),
  trainingId: Type.String({ format: 'uuid' })
});