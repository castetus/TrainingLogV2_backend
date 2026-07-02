import { ExerciseType } from "@/shared/types";
import type { FromSchema } from 'json-schema-to-ts';
import { getTrainingDto } from "./dto/get-training.dto";

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

export type TrainingExerciseRequest = {
  exerciseId: string;
  position: number;
  plannedSets: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
}

export type TrainingCreateRequest = {
  name: string;
  exercises: TrainingExerciseRequest[];
}

export type TrainingUpdateRequest = {
  id: string;
} & Partial<TrainingCreateRequest>;

export type TrainingForWorkout = {
  id: string;
  name: string;
  exercises: {
    userExerciseConfigId: string;
    exerciseId: string;
    exerciseName: string;
    exerciseType: ExerciseType;
    position: number;
    plannedSets: number;
    plannedReps?: number;
    plannedWeight?: number;
    plannedTime?: number;
  }[];
};

type TrainingExerciseDetails = {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;

  position: number;

  plannedSets: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
};

export type TrainingDetailsResponse = {
  name: string;
  exercises: TrainingExerciseDetails[];
}

export type GetTrainingParams = FromSchema<typeof getTrainingDto.params>;