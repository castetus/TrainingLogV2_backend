import type { FastifyInstance } from 'fastify';

import { getAllExercises, createExercise, updateExercise, filterExercises, deleteExercise } from './exercises.controller';
import { createExerciseDto } from './dto/create-exercise.dto';
import { filterExerciseDto } from './dto/filter-exercises.dto';

export function exercisesRoutes (app: FastifyInstance) {
  app.get('/exercises', getAllExercises);
  app.get('/exercises/:id', { schema: filterExerciseDto }, filterExercises);
  app.post('/exercises', { schema: createExerciseDto }, createExercise);
  app.patch('/exercises/:id', { schema: createExerciseDto }, updateExercise);
  app.delete('/exercises/:id', deleteExercise);
}