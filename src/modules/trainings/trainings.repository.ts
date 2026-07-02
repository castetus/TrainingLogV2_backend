import { trainingExercises, trainings, userExerciseConfigs, exercises } from "@/db/schema";
import { Training, TrainingExerciseRequest, TrainingUpdateRequest } from "./trainings.types";
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
  return await db
    .select({
      trainingId: trainings.id,
      trainingName: trainings.name,
      position: trainingExercises.position,
      exerciseId: exercises.id,
      exerciseName: exercises.name,
      exerciseType: exercises.type,
      userExerciseConfigId: userExerciseConfigs.id,
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
    const result = await db.transaction(async (tx) => {
      const [training] = await tx
        .insert(trainings)
        .values({ userId, name })
        .returning();

      for (const item of exercises) {
        const [existingConfig] = await tx
          .select()
          .from(userExerciseConfigs)
          .where(
            and(
              eq(userExerciseConfigs.userId, userId),
              eq(userExerciseConfigs.exerciseId, item.exerciseId),
            )
          );

        let config;

        if (existingConfig) {
          config = existingConfig;
        } else {
          [config] = await tx
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
        }

        await tx.insert(trainingExercises).values({
          trainingId: training.id,
          userExerciseConfigId: config.id,
          position: item.position,
        });
      }

      return training;
    });

    return result;
};

export async function patchTraining ({ data, userId }: { data: TrainingUpdateRequest, userId: string }) {
  return await db.transaction(async (tx) => {
    await tx
      .update(trainings)
      .set({
        name: data.name,
      })
      .where(
        and(
          eq(trainings.id, data.id),
          eq(trainings.userId, userId),
        )
      );

    if (data.exercises) {
      await tx
        .delete(trainingExercises)
        .where(eq(trainingExercises.trainingId, data.id));
      for (const item of data.exercises) {

        let config;

        const [existingConfig] = await tx
          .select()
          .from(userExerciseConfigs)
          .where(
            and(
              eq(userExerciseConfigs.userId, userId),
              eq(userExerciseConfigs.exerciseId, item.exerciseId),
            )
          );

        if (existingConfig) {
          [config] = await tx
            .update(userExerciseConfigs)
            .set({
              plannedSets: item.plannedSets ?? null,
              plannedReps: item.plannedReps ?? null,
              plannedWeight: item.plannedWeight ?? null,
              plannedTime: item.plannedTime ?? null,
            })
            .where(eq(userExerciseConfigs.id, existingConfig.id))
            .returning();
        } else {
          [config] = await tx
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
        }

        if (!config) {
          throw new Error(`User exercise config was not created or updated for exerciseId=${item.exerciseId}`);
        }
    
        await tx.insert(trainingExercises).values({
          trainingId: data.id,
          userExerciseConfigId: config.id,
          position: item.position,
        });
      }
    }

    const training = await findTrainingById({
      trainingId: data.id,
      userId,
    });

    return training;
  });
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