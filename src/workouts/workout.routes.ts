import { FastifyInstance } from 'fastify';
import {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
 } from './workouts.controller';


export function workoutRoutes (app: FastifyInstance) {
  app.get('/workouts', getAllWorkouts);

  app.post('/workouts', createWorkout);

  app.get('/workouts/:id', getWorkoutById);

  app.patch('/workouts/:id', updateWorkout);

  app.delete('/workouts/:id', deleteWorkout);
};