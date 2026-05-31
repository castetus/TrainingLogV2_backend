import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateWorkoutRequest, GetWorkoutByIdParams, UpdateWorkoutRequest } from './workouts.types';
import { workoutService } from './workout.service';

export const getAllWorkouts = (req: FastifyRequest, res: FastifyReply) => {
  const workouts = workoutService.getAllWorkouts();
  return res.send(workouts);
};

export const createWorkout = (req: FastifyRequest<{ Body: CreateWorkoutRequest }>, res: FastifyReply) => {
  return res.send(workoutService.createWorkout(req.body));
};

export const getWorkoutById = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  const workout = workoutService.getWorkoutById(id);


  if (!workout) {
    return res.status(404).send({ message: 'Workout not found' });
  }

  return res.send(workout);
};

export const updateWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: UpdateWorkoutRequest }>, res: FastifyReply) => {
  const { id } = req.params;
  const updatedWorkout = workoutService.updateWorkout(id, req.body);

  if (!updatedWorkout) {
    return res.status(404).send({ message: 'Workout not found' });
  }

  return res.send(updatedWorkout);
};

export const deleteWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  const success = workoutService.deleteWorkout(id);

  if (!success) {
    return res.status(404).send({ message: 'Workout not found' });
  }
  return res.send(`Delete workout with ID: ${id}`);
};