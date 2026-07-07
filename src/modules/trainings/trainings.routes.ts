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
  TrainingDetailsApiResponseSchema,
  TrainingApiResponseSchema,
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
        200: TrainingDetailsApiResponseSchema,
      },
    },
  }, getTrainingById);

  app.post('/trainings', {
    schema: {
      tags: ['trainings'],
      body: CreateTrainingBodySchema,
      response: {
        200: TrainingApiResponseSchema,
      },
    },
  }, createTraining);

  app.put('/trainings/:id', {
    schema: {
      tags: ['trainings'],
      params: TrainingParamsSchema,
      body: UpdateTrainingBodySchema,
      response: {
        200: TrainingApiResponseSchema,
      },
    },
  }, updateTraining);

  app.delete('/trainings/:id', {
    schema: {
      tags: ['trainings'],
      params: TrainingParamsSchema,
    },
  }, deleteTraining);
};
