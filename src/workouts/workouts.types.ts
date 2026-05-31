export enum WorkoutStatus {
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  userId: string;
  status: WorkoutStatus;
  continuation: number;
  trainingId: string;
};

export type GetWorkoutByIdParams = {
  id: string;
}

export type CreateWorkoutRequest = Pick<Workout, 'trainingId'>;

export type UpdateWorkoutRequest = Partial<Pick<Workout, 'status' | 'continuation'>>;