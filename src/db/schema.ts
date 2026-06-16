import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const trainings = pgTable('trainings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userExerciseConfigs = pgTable('user_exercise_configs', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id').notNull(),
  exerciseId: uuid('exercise_id').notNull(),

  plannedSets: integer('planned_sets'),
  plannedReps: integer('planned_reps'),
  plannedWeight: integer('planned_weight'),
  plannedTime: integer('planned_time'),

  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const trainingExercises = pgTable('training_exercises', {
  id: uuid('id').defaultRandom().primaryKey(),

  trainingId: uuid('training_id').notNull(),
  exerciseId: uuid('exercise_id').notNull(),
  userExerciseConfigId: uuid('user_exercise_config_id').notNull(),

  order: integer('order').notNull(),
});