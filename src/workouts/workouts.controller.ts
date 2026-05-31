import { FastifyRequest, FastifyReply } from 'fastify';
import { GetWorkoutByIdParams, Workout } from './workouts.types';

export const getAllWorkouts = (req: FastifyRequest, res: FastifyReply) => {
  res.send('Get all workouts');
};

export const createWorkout = (req: FastifyRequest, res: FastifyReply) => {
  res.send('Create a new workout');
};

export const getWorkoutById = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  res.send(`Get workout with ID: ${id}`);
};

export const updateWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  res.send(`Update workout with ID: ${id}`);
};

export const deleteWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  res.send(`Delete workout with ID: ${id}`);
};