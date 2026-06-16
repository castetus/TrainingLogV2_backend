import type { ExerciseType } from "@/shared/types";

export type Exercise = {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  description?: string;
  type: ExerciseType;
}

export type CreateExerciseRequest = Pick<Exercise, 'name' | 'description' | 'type'>;

export type GetExercisesQuery = {
  search?: string;
};