import { FastifyInstance } from 'fastify';
import {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
 } from './workouts.controller';
import { createWorkoutDto } from './dto/create-workout.dto';
import { updateWorkoutDto } from './dto/update-workout.dto';


export function workoutRoutes (app: FastifyInstance) {
  app.get('/workouts', getAllWorkouts);

  app.post('/workouts', { schema: createWorkoutDto }, createWorkout);

  app.get('/workouts/:id', getWorkoutById);

  app.patch('/workouts/:id', { schema: updateWorkoutDto }, updateWorkout);

  app.delete('/workouts/:id', deleteWorkout);
};