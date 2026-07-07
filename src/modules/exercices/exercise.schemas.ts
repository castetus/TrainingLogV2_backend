import { Type } from '@sinclair/typebox';
import { createApiResponseSchema } from '@/shared/schemas';

export const ExerciseTypeSchema = Type.Union([
  Type.Literal('weight'),
  Type.Literal('time'),
  Type.Literal('base'),
], { $id: 'ExerciseType' });

export const ExerciseParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
}, { $id: 'ExerciseParams' });

export const GetExercisesQuerySchema = Type.Object({
  search: Type.Optional(Type.String()),
}, { $id: 'GetExercisesQuery' });

export const CreateExerciseBodySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  type: Type.Optional(Type.String({ minLength: 1 })),
}, { $id: 'CreateExerciseBody' });

export const ExerciseResponseSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  created_at: Type.String(),
  updated_at: Type.String(),
  description: Type.Optional(Type.String()),
  type: ExerciseTypeSchema,
}, { $id: 'ExerciseResponse' });

export const ExerciseListResponseSchema = createApiResponseSchema(
  Type.Array(ExerciseResponseSchema),
  { $id: 'ExerciseListResponse' },
);

export const ExerciseApiResponseSchema = createApiResponseSchema(
  ExerciseResponseSchema,
  { $id: 'ExerciseApiResponse' },
);
