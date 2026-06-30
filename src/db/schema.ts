import { workoutStatuses } from '@/shared/constants';
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  unique,
} from 'drizzle-orm/pg-core';

export const exercises = pgTable('exercises', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),

  description: text('description').notNull(),

  type: text('type', {
    enum: ['weight', 'time', 'base'],
  }).notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
});

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
},
  (table) => [
    unique().on(table.userId, table.exerciseId),
  ]
);

export const trainingExercises = pgTable('training_exercises', {
  id: uuid('id').defaultRandom().primaryKey(),

  trainingId: uuid('training_id').notNull().references(() => trainings.id, {
    onDelete: 'cascade',
  }),
  userExerciseConfigId: uuid('user_exercise_config_id').notNull().references(() => userExerciseConfigs.id, {
    onDelete: 'cascade',
  }),

  position: integer('position').notNull(),
});

export const workouts = pgTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  trainingId: uuid('training_id').notNull().references(() => trainings.id),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  status: text('status', {
    enum: workoutStatuses,
  }).notNull(),
  durationMs: integer().notNull().default(0),
});