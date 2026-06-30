export enum WorkoutStatus {
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
};

export type Workout = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  status: WorkoutStatus;
  durationMs: number;
  trainingId: string;
};

export type GetWorkoutByIdParams = {
  id: string;
}

export type CreateWorkoutRequest = Pick<Workout, 'trainingId'>;

export type UpdateWorkoutRequest = Partial<Pick<Workout, 'status' | 'durationMs'>>;