import type { FastifyInstance } from 'fastify';

import { getExercises, createExercise, updateExercise, deleteExercise, getExerciseById } from './exercises.controller';
import {
  ExerciseParamsSchema,
  GetExercisesQuerySchema,
  CreateExerciseBodySchema,
  ExerciseListResponseSchema,
  ExerciseApiResponseSchema,
} from './exercise.schemas';

export function exercisesRoutes (app: FastifyInstance) {
  app.get('/exercises', {
    schema: {
      tags: ['exercises'],
      querystring: GetExercisesQuerySchema,
      response: {
        200: ExerciseListResponseSchema,
      },
    },
  }, getExercises);

  app.get('/exercises/:id', {
    schema: {
      tags: ['exercises'],
      params: ExerciseParamsSchema,
      response: {
        200: ExerciseApiResponseSchema,
      },
    },
  }, getExerciseById);

  app.post('/exercises', {
    schema: {
      tags: ['exercises'],
      body: CreateExerciseBodySchema,
      response: {
        200: ExerciseApiResponseSchema,
      },
    },
  }, createExercise);

  app.patch('/exercises/:id', {
    schema: {
      tags: ['exercises'],
      params: ExerciseParamsSchema,
      body: CreateExerciseBodySchema,
      response: {
        200: ExerciseApiResponseSchema,
      },
    },
  }, updateExercise);

  app.delete('/exercises/:id', {
    schema: {
      tags: ['exercises'],
      params: ExerciseParamsSchema,
    },
  }, deleteExercise);
}
