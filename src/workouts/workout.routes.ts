import type { FastifyInstance } from 'fastify';
import {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
 } from './workouts.controller';
import { createWorkoutDto } from './dto/create-workout.dto';
import { updateWorkoutDto } from './dto/update-workout.dto';
import { getWorkoutByIdDto } from './dto/get-workout.dto';


export function workoutRoutes (app: FastifyInstance) {
  app.get('/workouts', { schema: getWorkoutByIdDto }, getAllWorkouts);

  app.post('/workouts', { schema: createWorkoutDto }, createWorkout);

  app.get('/workouts/:id', { schema: getWorkoutByIdDto }, getWorkoutById);

  app.patch('/workouts/:id', { schema: updateWorkoutDto }, updateWorkout);

  app.delete('/workouts/:id', { schema: getWorkoutByIdDto }, deleteWorkout);
};