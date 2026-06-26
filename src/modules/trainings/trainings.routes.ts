import type { FastifyInstance } from 'fastify';
import { createTrainingDto } from './dto/create-training.dto';

import {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from './trainings.controller';
import { updateTrainingDto } from './dto/update-training-dto';
import { getTrainingDto } from './dto/get-training.dto';

export function trainingsRoutes (app: FastifyInstance) {
  app.get('/trainings', getTrainings);
  app.get('/trainings/:id', { schema: getTrainingDto }, getTrainingById);
  app.post('/trainings', { schema: createTrainingDto }, createTraining);
  // app.put('/trainings/:id', { schema: updateTrainingDto }, updateTraining);
  // app.delete('/trainings/:id', deleteTraining);
}