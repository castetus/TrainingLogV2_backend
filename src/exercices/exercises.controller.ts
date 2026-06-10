import type { ApiResponse } from '@/shared/types';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Exercise, CreateExerciseRequest, GetExercisesQuery } from './exercises.types';
import { exercisesService } from './exercises.service';

export const getExercises = async (
  req: FastifyRequest<{ Querystring: GetExercisesQuery }>,
  reply: FastifyReply,
) => {
  const search = req.query.search?.trim() ?? '';

  const exercises = await exercisesService.getExercises({ search });

  return reply.send({ data: exercises });
};

export const getExerciseById = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
  const { id } = req.params;
  const exercise = await exercisesService.getExerciseById(id);
  if (!exercise) {
    return res.status(404).send({ message: 'Exercise not found' });
  }
  const response: ApiResponse<Exercise> = {
    data: exercise,
  };
  return res.send(response);
}

export const createExercise = async (req: FastifyRequest<{ Body: CreateExerciseRequest }>, res: FastifyReply) => {
  const newExercise = await exercisesService.createExercise(req.body);
  const response: ApiResponse<Exercise> = {
    data: newExercise,
  };
  return res.send(response);
};

export const filterExercises = async (req: FastifyRequest<{ Querystring: { search: string } }>, res: FastifyReply) => {
  const searchResult = await exercisesService.filterExercises(req.query.search);

  return res.send(searchResult);
};

export const updateExercise = async (req: FastifyRequest<{ Params: { id: string }, Body: CreateExerciseRequest }>, res: FastifyReply) => {
  const { id } = req.params;
  const updatedExercise = await exercisesService.updateExercise(id, req.body);
  return res.send(updatedExercise);
};

export const deleteExercise = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
  const { id } = req.params;
  await exercisesService.deleteExercise(id);
  return res.status(204).send();
}