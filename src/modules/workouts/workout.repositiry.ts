import { db } from "@/db/db";
import { desc, eq, and, asc } from 'drizzle-orm';
import { WorkoutStatus } from "./workouts.types";
import { workouts } from "@/db/schema";

export async function getAllWorkouts() {

};

export async function findWorkoutById({ workoutId, userId }: { workoutId: string, userId: string }) {
  const [workout] = await db.select().from(workouts)
    .where(and(eq(workouts.userId, userId), eq(workouts.id, workoutId)));
  return workout;
};

export async function createWorkout() {

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

export async function startWorkout() {

};

export async function finishWorkout() {

};

