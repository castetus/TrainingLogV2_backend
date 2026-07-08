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
import { WorkoutParamsSchema, WorkoutDetailsApiResponseSchema, WorkoutApiResponseSchema, WorkoutListResponseSchema, CreateWorkoutBodySchema, WorkoutBaseResponseSchema } from './workout.schemas';


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
        200: WorkoutApiResponseSchema,
      },
    },
  }, getWorkoutById);

  app.get('/workouts/:workoutId/details', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,
      response: {
        200: WorkoutDetailsApiResponseSchema,
      },
    },
  }, getWorkoutDetails);

  app.post('/workouts', {
    schema: {
      tags: ['workouts'],
      body: CreateWorkoutBodySchema,
      response: {
        200: WorkoutApiResponseSchema,
      }
    }
  }, createWorkout);

  app.post('/workouts/:workoutId/pause', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutApiResponseSchema
      }
    }
  }, pauseWorkout);

  app.post('/workouts/:workoutId/resume', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutApiResponseSchema
      }
    }
  }, resumeWorkout);

  app.post('/workouts/:workoutId/finish', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutApiResponseSchema
      }
    }
  }, finishWorkout);

  app.post('/workouts/:workoutId/cancel', {
    schema: {
      tags: ['workouts'],
      params: WorkoutParamsSchema,

      response: {
        200: WorkoutApiResponseSchema
      }
    }
  }, cancelWorkout);

  app.delete('/workouts/:workoutId', { schema: { tags: ['workouts'], params: WorkoutParamsSchema } }, deleteWorkout);
};