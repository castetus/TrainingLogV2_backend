import { ExerciseType } from "@/shared/types";

type BaseUserExerciseConfig = {
  id: string;
  exerciseId: string;
  userId: string;
  isArchived: boolean;
};

export type UserExerciseConfig = BaseUserExerciseConfig & ({
  exerciseType: 'weight';
  plannedReps: number;
  plannedSets: number;
  plannedWeight: number;
} | {
  exerciseType: 'time';
  plannedTime: number;
} | {
  exerciseType: 'base';
  plannedReps: number;
});

export type TrainingExercise = {
  id: string;
  trainingId: string;
  userExerciseConfigId: string;
  order: string;
}

export type Training = {
  id: string;
  name: string;
  userId: string;
}

type TrainingExerciseRequest = {
  exerciseId: string;
  order: number;
  plannedSets?: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
}

export type TrainingCreateRequest = {
  name: string;
  exercices: TrainingExerciseRequest[];
}