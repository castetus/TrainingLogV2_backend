ALTER TABLE user_exercise_configs
ADD COLUMN created_at timestamp default now();