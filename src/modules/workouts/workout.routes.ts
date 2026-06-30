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
 } from './workouts.controller';
import { createWorkoutDto } from './dto/create-workout.dto';
import { updateWorkoutDto } from './dto/update-workout.dto';
import { getWorkoutByIdDto } from './dto/get-workout.dto';


export function workoutRoutes (app: FastifyInstance) {
  app.get('/workouts', getAllWorkouts);
  app.get('/workouts/:id', { schema: getWorkoutByIdDto }, getWorkoutById);

  app.post('/workouts', { schema: createWorkoutDto }, createWorkout);

  app.post('/workouts/:id/pause', pauseWorkout);
  app.post('/workouts/:id/resume', resumeWorkout);
  app.post('/workouts/:id/finish', finishWorkout);
  app.post('/workouts/:id/cancel', cancelWorkout);

  app.delete('/workouts/:id', { schema: getWorkoutByIdDto }, deleteWorkout);
};