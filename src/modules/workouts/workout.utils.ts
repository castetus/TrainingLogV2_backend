import { ExerciseType } from "@/shared/types";
import { WorkoutDetailsRow, WorkoutDetails, WorkoutExerciseDetails, WorkoutSetDetails } from "./workouts.types";

const buildWorkoutSet = (row: WorkoutDetailsRow): WorkoutSetDetails => {
  return {
    id: row.workoutSetResultId,
    setNumber: row.setNumber,
    reps: row.reps ?? undefined,
    weightKg: row.weightKg ?? undefined,
    durationSeconds: row.durationSeconds ?? undefined,
    isCompleted: row.isCompleted,
  };
};

const buildWorkoutExercises = (rows: WorkoutDetailsRow[]): WorkoutExerciseDetails[] => {

  const exercisesMap = new Map<string, WorkoutExerciseDetails>();

  for (const row of rows) {
    const rowId = row.workoutExerciseResultId;
    const existedRow = exercisesMap.get(rowId);
    if (existedRow) {
      exercisesMap.set(rowId, {
        ...existedRow,
        sets: [
          ...existedRow.sets,
          buildWorkoutSet(row),
        ],
      })
    } else {
      exercisesMap.set(rowId, {
        id: rowId,
        exerciseId: row.exerciseId,
        exerciseName: row.exerciseName,
        exerciseType: row.exerciseType as ExerciseType,
        userExerciseConfigId: row.userExerciseConfigId,
        position: row.position,
        sets: [buildWorkoutSet(row)],
      });
    }
  }

  return Array.from(exercisesMap.values());
};

export const buildWorkoutDetails = (
  rows: WorkoutDetailsRow[]
): WorkoutDetails => {

  console.log('ROWS:', rows)

  const firstRow = rows[0];

  return {
    id: firstRow.workoutId,
    name: firstRow.workoutName,
    status: firstRow.status,
    durationMs: firstRow.durationMs,
    trainingId: firstRow.trainingId,
    exercises: buildWorkoutExercises(rows),
  };
};