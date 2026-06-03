import type { FastifyInstance } from 'fastify';

import { getAllExercises, createExercise } from './exercises.controller';
import { createExerciseDto } from './dto/create-exercise.dto';

export function exercisesRoutes (app: FastifyInstance) {
  app.get('/exercises', getAllExercises);
  app.post('/exercises', { schema: createExerciseDto }, createExercise);
}