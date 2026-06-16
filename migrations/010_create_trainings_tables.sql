CREATE TABLE trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE user_exercise_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  planned_sets INTEGER,
  planned_reps INTEGER,
  planned_weight NUMERIC(6, 2),
  planned_time INTEGER,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE training_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
  user_exercise_config_id UUID NOT NULL REFERENCES user_exercise_configs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL
);