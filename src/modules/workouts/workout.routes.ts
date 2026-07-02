import type { FastifyInstance } from 'fastify';
import {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  deleteWorkout,
  pauseWorkout,
  resumeWorkout,
  finishWorkout,
  cancelWorkout,
  getWorkoutDetails,
 } from './workouts.controller';
import { WorkoutParamsSchema, WorkoutDetailsResponseSchema, WorkoutBaseResponseSchema, WorkoutListResponseSchema, CreateWorkoutBodySchema } from './workout.schemas';


export function workoutRoutes (app: FastifyInstance) {
  app.get('/workouts', {
    schema: {
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutListResponseSchema,
      },
    }
  }, getAllWorkouts);

  app.get('/workouts/:id', {
    schema: {
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutBaseResponseSchema,
      },
    },
  }, getWorkoutById);

  app.get('/workouts/:id/details', {
    schema: {
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutDetailsResponseSchema,
      },
    },
  }, getWorkoutDetails);

  app.post('/workouts', {
    schema: {
      body: CreateWorkoutBodySchema,
      response: {
        200: WorkoutDetailsResponseSchema
      }
    }
  }, createWorkout);

  app.post('/workouts/:id/pause', {
    schema: {
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, pauseWorkout);

  app.post('/workouts/:id/resume', {
    schema: {
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, resumeWorkout);

  app.post('/workouts/:id/finish', {
    schema: {
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, finishWorkout);

  app.post('/workouts/:id/cancel', {
    schema: {
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, cancelWorkout);

  app.delete('/workouts/:id', { schema: { params: WorkoutParamsSchema } }, deleteWorkout);
};