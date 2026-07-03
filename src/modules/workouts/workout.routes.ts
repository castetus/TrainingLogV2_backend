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
      tags: ['workouts'],
      response: {
        200: WorkoutListResponseSchema,
      },
    }
  }, getAllWorkouts);

  app.get('/workouts/:workoutId', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutBaseResponseSchema,
      },
    },
  }, getWorkoutById);

  app.get('/workouts/:workoutId/details', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutDetailsResponseSchema,
      },
    },
  }, getWorkoutDetails);

  app.post('/workouts', {
    schema: {
      tags: ['workouts'],
      body: CreateWorkoutBodySchema,
      response: {
        200: WorkoutDetailsResponseSchema
      }
    }
  }, createWorkout);

  app.post('/workouts/:workoutId/pause', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, pauseWorkout);

  app.post('/workouts/:workoutId/resume', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, resumeWorkout);

  app.post('/workouts/:workoutId/finish', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, finishWorkout);

  app.post('/workouts/:workoutId/cancel', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutBaseResponseSchema
      }
    }
  }, cancelWorkout);

  app.delete('/workouts/:workoutId', { schema: { tags: ['workouts'], params: WorkoutParamsSchema } }, deleteWorkout);
};