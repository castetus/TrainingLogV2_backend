import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateWorkoutRequest, GetWorkoutByIdParams, UpdateWorkoutRequest, Workout } from './workouts.types';
import { workoutService } from './workout.service';
import type { ApiResponse } from '@/shared/types';


export const getAllWorkouts = async (req: FastifyRequest, res: FastifyReply) => {
  const workouts = await workoutService.getAllWorkouts(req.user.userId);
  const response: ApiResponse<Workout[], { total: number }> = {
    data: workouts,
    meta: {
      total: workouts.length,
    }
  }
  return res.send(response);
};

export const createWorkout = async (req: FastifyRequest<{ Body: CreateWorkoutRequest }>, res: FastifyReply) => {
  const newWorkout = await workoutService.createWorkout({
    data: req.body,
    userId: req.user.userId,
  })
  return res.send({ data: newWorkout });
};

export const getWorkoutById = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const workout = await workoutService.getWorkoutById({
    workoutId: req.params.id,
    userId: req.user.userId
  });


  if (!workout) {
    return res.status(404).send({ data: 'Workout not found' });
  }

  const response: ApiResponse<Workout> = {
    data: workout,
  }

  return res.send(response);
};

export const getWorkoutDetails = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const workoutDetails = await workoutService.getWorkoutDetails({
    workoutId: req.params.id,
    userId: req.user.userId,
  });

  res.send({ data: workoutDetails });
};

// export const updateWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: UpdateWorkoutRequest }>, res: FastifyReply) => {
//   const { id } = req.params;
//   const updatedWorkout = workoutService.updateWorkout(id, req.body);

//   if (!updatedWorkout) {
//     return res.status(404).send({ data: 'Workout not found' });
//   }

//   const response: ApiResponse<Workout> = {
//     data: updatedWorkout,
//   }

//   return res.send(response);
// };

export const pauseWorkout = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: { durationMs?: number } }>, res: FastifyReply) => {
  const result = await workoutService.transitionWorkout({
    workoutId: req.params.id,
    userId: req.user.userId,
    action: 'pause',
    durationMs: req.body.durationMs,
  });

  res.status(204).send();
};

export const resumeWorkout = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: { durationMs?: number } }>, res: FastifyReply) => {
  await workoutService.transitionWorkout({
    workoutId: req.params.id,
    userId: req.user.userId,
    action: 'resume',
    durationMs: req.body.durationMs,
  });

  res.status(204).send();
};

export const finishWorkout = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: { durationMs?: number } }>, res: FastifyReply) => {
  await workoutService.transitionWorkout({
    workoutId: req.params.id,
    userId: req.user.userId,
    action: 'finish',
    durationMs: req.body.durationMs,
  });

  res.status(204).send();
};

export const cancelWorkout = async (req: FastifyRequest<{ Params: GetWorkoutByIdParams, Body: { durationMs?: number } }>, res: FastifyReply) => {
  await workoutService.transitionWorkout({
    workoutId: req.params.id,
    userId: req.user.userId,
    action: 'cancel',
    durationMs: req.body.durationMs,
  });

  res.status(204).send();
};


export const deleteWorkout = (req: FastifyRequest<{ Params: GetWorkoutByIdParams }>, res: FastifyReply) => {
  const { id } = req.params;
  const success = workoutService.deleteWorkout(id);

  if (!success) {
    return res.status(404).send({ data: 'Workout not found' });
  }
  return res.status(204).send();
};