import type { ApiResponse } from '@/shared/types';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Exercise, CreateExerciseRequest } from './exercises.types';
import { exercisesService } from './exercises.service';


export const getAllExercises = async (req: FastifyRequest, res: FastifyReply) => {
  const exercises = await exercisesService.getAllExercises();
  const response: ApiResponse<Exercise[], { total: number }> = {
    data: exercises,
    meta: {
      total: exercises.length,
    }
  }
  return res.send(response);
};

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
  const updatedExrcise = await exercisesService.updateExercise(req.id, req.body);
};