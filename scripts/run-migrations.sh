#!/usr/bin/env bash

set -e

for file in migrations/*.sql; do
  echo "Running migration: $file"

  docker exec -i training-log-postgres \
    psql -U training_log_user -d training_log \
    < "$file"
done

echo "All migrations applied"