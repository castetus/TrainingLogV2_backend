CREATE TABLE workout_exercise_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  user_exercise_config_id UUID NOT NULL REFERENCES user_exercise_configs(id),
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  exercise_name TEXT NOT NULL,
  exercise_type TEXT NOT NULL
);

CREATE TABLE workout_set_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_exercise_result_id UUID NOT NULL REFERENCES workout_exercise_results(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight_kg NUMERIC(6, 2),
  duration_seconds INTEGER
);
