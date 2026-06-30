ALTER TABLE workouts
  ADD COLUMN training_id UUID NOT NULL REFERENCES trainings(id),
  ADD COLUMN status TEXT NOT NULL DEFAULT 'in_progress',
  ADD CONSTRAINT workouts_status_check
    CHECK (
      status IN (
        'in_progress',
        'paused',
        'finished',
        'cancelled'
      )
    ),
  ADD COLUMN duration_ms INTEGER NOT NULL DEFAULT 0,
  DROP COLUMN updated_at;