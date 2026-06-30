export type ApiResponse<TData, TMeta = undefined> = {
  data: TData;
  meta?: TMeta;
};

export type ExerciseType = 'weight' | 'time' | 'base';

export type WorkoutAction = 'pause' | 'resume' | 'finish' | 'cancel';