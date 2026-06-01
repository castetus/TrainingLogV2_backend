import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateWorkoutRequest, GetWorkoutByIdParams, UpdateWorkoutRequest, Workout } from './workouts.types';
import { workoutService } from './workout.service';
import type { ApiResponse } from '../shared/types';

export const getAllWorkouts = (req: FastifyRequest, res: FastifyReply) => {
  const workouts = workoutService.getAllWorkouts();
  const response: ApiResponse<Workout[], { total: number }> = {
    data: workouts,
    meta: {
      total: workouts.length,
    }
  }
  return res.send(response);
};

export const createWorkout = (req: FastifyRequest<{ Body: CreateWorkoutRequest }>, res: FastifyReply) => {
  return res.send({ data: workoutService.createWorkout(req.body) });
};

export const getWorkoutById = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  const workout = workoutService.getWorkoutById(id);


  if (!workout) {
    return res.status(404).send({ data: 'Workout not found' });
  }

  const response: ApiResponse<Workout> = {
    data: workout,
  }

  return res.send(response);
};

export const updateWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: UpdateWorkoutRequest }>, res: FastifyReply) => {
  const { id } = req.params;
  const updatedWorkout = workoutService.updateWorkout(id, req.body);

  if (!updatedWorkout) {
    return res.status(404).send({ data: 'Workout not found' });
  }

  const response: ApiResponse<Workout> = {
    data: updatedWorkout,
  }

  return res.send(response);
};

export const deleteWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  const success = workoutService.deleteWorkout(id);

  if (!success) {
    return res.status(404).send({ data: 'Workout not found' });
  }
  return res.status(204).send();
};