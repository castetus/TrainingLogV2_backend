import type { ApiResponse } from '@/shared/types';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { Training, TrainingCreateRequest } from './trainings.types';
import { exercisesService } from './trainings.service';

export const getTrainings = async () => {

};

export const getTrainingById = async () => {

};

export const createTraining = async (req: FastifyRequest<{ Body: TrainingCreateRequest }>, res: FastifyReply) => {
  const newTraining = await exercisesService.createTraining(req.body);
  const response: ApiResponse<Training> = {
    data: newTraining,
  };
  return res.send(response);
};

export const updateTraining = async () => {

};

export const deleteTraining = async () => {

};