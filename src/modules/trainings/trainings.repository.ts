import { trainingExercises, trainings, userExerciseConfigs, exercises } from "@/db/schema";
import { Training, TrainingExerciseRequest } from "./trainings.types";
import { db } from "@/db/db";
import { desc, eq, and, asc } from 'drizzle-orm';

export async function getAllTrainings (userId: string) {
  return db
    .select()
    .from(trainings)
    .where(eq(trainings.userId, userId))
    .orderBy(desc(trainings.createdAt));
};

export async function findTrainingById ({ trainingId, userId }: { trainingId: string, userId: string }) {
  return db
    .select({
      trainingId: trainings.id,
      trainingName: trainings.name,
      position: trainingExercises.position,
      exerciseId: exercises.id,
      exerciseName: exercises.name,
      exerciseType: exercises.type,
      plannedReps: userExerciseConfigs.plannedReps,
      plannedWeight: userExerciseConfigs.plannedWeight,
      plannedSets: userExerciseConfigs.plannedSets,
      plannedTime: userExerciseConfigs.plannedTime,
    })
    .from(trainings)
    .innerJoin(trainingExercises, eq(trainings.id, trainingExercises.trainingId))
    .innerJoin(userExerciseConfigs, eq(trainingExercises.userExerciseConfigId, userExerciseConfigs.id))
    .innerJoin(exercises, eq(userExerciseConfigs.exerciseId, exercises.id))
    .where(and(eq(trainings.userId, userId), eq(trainings.id, trainingId)))
    .orderBy(asc(trainingExercises.position))
};

export async function insertTraining({ userId, name, exercises }: { userId: string, name: string, exercises: TrainingExerciseRequest[] }): Promise<Training | null> {
  try {
    const result = await db.transaction(async (tx) => {
      const [training] = await tx
        .insert(trainings)
        .values({ userId, name })
        .returning();

      for (const item of exercises) {
        const [config] = await tx
          .insert(userExerciseConfigs)
          .values({
            userId,
            exerciseId: item.exerciseId,
            plannedSets: item.plannedSets,
            plannedReps: item.plannedReps,
            plannedWeight: item.plannedWeight,
            plannedTime: item.plannedTime,
          })
          .returning();

        await tx.insert(trainingExercises).values({
          trainingId: training.id,
          userExerciseConfigId: config.id,
          position: item.position,
        });
      }

      return training;
    });

    return result;
  } catch (error: any) {
    console.error('DB error:', {
      message: error.message,
      cause: error.cause,
      code: error.cause?.code,
      detail: error.cause?.detail,
      constraint: error.cause?.constraint,
      table: error.cause?.table,
      column: error.cause?.column,
    });

    throw error;
  }
};

export async function patchTraining () {

};

export async function removeTraining ({ trainingId, userId }: { trainingId: string; userId: string }) {
  await db
  .delete(trainings)
  .where(
    and(
      eq(trainings.id, trainingId),
      eq(trainings.userId, userId),
    )
  );
};