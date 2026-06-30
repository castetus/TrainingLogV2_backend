import { WorkoutStatus } from "@/modules/workouts/workouts.types";

export const workoutStatuses = [
  WorkoutStatus.IN_PROGRESS,
  WorkoutStatus.FINISHED,
  WorkoutStatus.CANCELLED,
  WorkoutStatus.PAUSED,
] as const;