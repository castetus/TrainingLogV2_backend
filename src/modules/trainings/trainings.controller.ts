import type { ApiResponse } from '@/shared/types';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { Training, TrainingCreateRequest, TrainingUpdateRequest } from './trainings.types';
import { trainingService } from './trainings.service';

export const getTrainings = async (req: FastifyRequest, res: FastifyReply) => {
  const result = await trainingService.getTrainings(req.user.userId);

  return res.send({ data: result });
};

export const getTrainingById = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
  const trainingDetails = await trainingService.getTrainingById({ trainingId: req.params.id, userId: req.user.userId });
  if (!trainingDetails) {
    return res.status(404).send({ message: 'Training not found' });
  }
  return res.send(trainingDetails);
};

export const createTraining = async (req: FastifyRequest<{ Body: TrainingCreateRequest }>, res: FastifyReply) => {
  const newTraining = await trainingService.createTraining({ data: req.body, userId: req.user.userId });
  const response: ApiResponse<Training> = {
    data: newTraining,
  };
  return res.send(response);
};

export const updateTraining = async (req: FastifyRequest<{ Body: TrainingUpdateRequest }>, res: FastifyReply) => {
  const updatedTraining = await trainingService.updateTraining({ data: req.body, userId: req.user.userId });

  return res.send(updatedTraining);
};

export const deleteTraining = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
  await trainingService.deleteTraining({
    trainingId: req.params.id,
    userId: req.user.userId,
  });

  res.status(204).send();
};