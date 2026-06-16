import type { FastifyInstance } from 'fastify';
import { createTrainingDto } from './dto/create-training.dto';
import {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from './trainings.controller';

export function trainingsRoutes (app: FastifyInstance) {
  app.get('/trainings', getTrainings);
  app.get('/trainings/:id', getTrainingById);
  app.post('/trainings', { schema: createTrainingDto }, createTraining);
  app.patch('/trainings/:id', { schema: createTrainingDto }, updateTraining);
  app.delete('/trainings/:id', deleteTraining);
}