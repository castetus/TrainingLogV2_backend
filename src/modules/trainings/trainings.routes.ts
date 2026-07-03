import type { FastifyInstance } from 'fastify';

import {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from './trainings.controller';
import {
  TrainingParamsSchema,
  CreateTrainingBodySchema,
  UpdateTrainingBodySchema,
  TrainingListResponseSchema,
  TrainingDetailsResponseSchema,
  TrainingResponseSchema,
} from './training.schemas';

export function trainingsRoutes (app: FastifyInstance) {
  app.get('/trainings', {
    schema: {
      tags: ['trainings'],
      response: {
        200: TrainingListResponseSchema,
      },
    },
  }, getTrainings);

  app.get('/trainings/:id', {
    schema: {
      tags: ['trainings'],
      params: TrainingParamsSchema,
      response: {
        200: TrainingDetailsResponseSchema,
      },
    },
  }, getTrainingById);

  app.post('/trainings', {
    schema: {
      tags: ['trainings'],
      body: CreateTrainingBodySchema,
      response: {
        200: TrainingResponseSchema,
      },
    },
  }, createTraining);

  app.put('/trainings/:id', {
    schema: {
      tags: ['trainings'],
      params: TrainingParamsSchema,
      body: UpdateTrainingBodySchema,
    },
  }, updateTraining);

  app.delete('/trainings/:id', {
    schema: {
      tags: ['trainings'],
      params: TrainingParamsSchema,
    },
  }, deleteTraining);
};
