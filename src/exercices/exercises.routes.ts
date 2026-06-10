import type { FastifyInstance } from 'fastify';

import { getExercises, createExercise, updateExercise, deleteExercise, getExerciseById } from './exercises.controller';
import { createExerciseDto } from './dto/create-exercise.dto';
import { GetExercisesDTO } from './dto/get-exercises.dto';

export function exercisesRoutes (app: FastifyInstance) {
  app.get('/exercises', { schema: GetExercisesDTO }, getExercises);
  app.get('/exercises/:id', getExerciseById);
  app.post('/exercises', { schema: createExerciseDto }, createExercise);
  app.patch('/exercises/:id', { schema: createExerciseDto }, updateExercise);
  app.delete('/exercises/:id', deleteExercise);
}