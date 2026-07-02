import { db } from "@/db/db";
import { desc, eq, and, asc } from 'drizzle-orm';
import { Workout, WorkoutDetailsRow, WorkoutStatus } from "./workouts.types";
import { workoutExerciseResults, workouts, workoutSetResults } from "@/db/schema";
import { TrainingForWorkout } from "../trainings/trainings.types";

export async function getWorkouts(userId: string): Promise<Workout[]> {
  return await db
    .select()
    .from(workouts)
    .where(eq(workouts.userId, userId));
};

export async function findWorkoutById({ workoutId, userId }: { workoutId: string, userId: string }) {
  const [workout] = await db.select().from(workouts)
    .where(and(eq(workouts.userId, userId), eq(workouts.id, workoutId)));
  return workout;
};

export async function getWorkoutDetailRows({ workoutId, userId }: { workoutId: string, userId: string }):       Promise<WorkoutDetailsRow[]> {
  return await db
    .select({
      workoutId: workouts.id,
      status: workouts.status,
      trainingId: workouts.trainingId,
      durationMs: workouts.durationMs,
      workoutName: workouts.name,

      workoutExerciseResultId: workoutExerciseResults.id,
      exerciseId: workoutExerciseResults.exerciseId,
      exerciseName: workoutExerciseResults.exerciseName,
      exerciseType: workoutExerciseResults.exerciseType,
      position: workoutExerciseResults.position,

      workoutSetResultId: workoutSetResults.id,
      setNumber: workoutSetResults.setNumber,
      reps: workoutSetResults.reps,
      weightKg: workoutSetResults.weightKg,
      durationSeconds: workoutSetResults.durationSeconds,
      isCompleted: workoutSetResults.isCompleted,
    })
    .from(workouts)
    .innerJoin(
      workoutExerciseResults,
      eq(workoutExerciseResults.workoutId, workouts.id)
    )
    .innerJoin(
      workoutSetResults,
      eq(
        workoutSetResults.workoutExerciseResultId,
        workoutExerciseResults.id
      )
    )
    .where(and(eq(workouts.userId, userId), eq(workouts.id, workoutId)))
    .orderBy(
      workoutExerciseResults.position,
      workoutSetResults.setNumber
    );
};

export async function insertWorkout({
  name,
  userId,
  training,
}: {
  name: string,
  userId: string,
  training: TrainingForWorkout,
}) {
  return await db.transaction(async (tx) => {

    const [workout] = await tx
      .insert(workouts)
      .values({ name, userId, trainingId: training.id, status: WorkoutStatus.IN_PROGRESS })
      .returning();

    for (const exercise of training.exercises) {
      const [workoutExerciseResult] = await tx
        .insert(workoutExerciseResults)
        .values({
          workoutId: workout.id,
          userExerciseConfigId: exercise.userExerciseConfigId,
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          exerciseType: exercise.exerciseType,
          position: exercise.position,
        })
        .returning();

        for (let setNumber = 1; setNumber <= exercise.plannedSets; setNumber++) {
          await tx.insert(workoutSetResults).values({
            workoutExerciseResultId: workoutExerciseResult.id,
            setNumber,
            reps: exercise.plannedReps ?? undefined,
            weightKg: exercise.plannedWeight ?? undefined,
            durationSeconds: exercise.plannedTime ?? undefined,
          });
        }
    }
    return workout;
  });
};

export async function updateWorkout() {

};

export async function updateWorkoutStatus(
  { workoutId, userId, status, durationMs }:
    { workoutId: string, userId: string, status: WorkoutStatus, durationMs?: number }
) {
  const patch: {
    status: WorkoutStatus;
    durationMs?: number;
  } = {
    status,
  };

  if (durationMs !== undefined) {
    patch.durationMs = durationMs;
  }
  const [updatedWorkout] = await
    db.update(workouts)
      .set(patch)
      .where(and(eq(workouts.userId, userId), eq(workouts.id, workoutId)))
      .returning();

  return updatedWorkout;
};
