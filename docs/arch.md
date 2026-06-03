## User
### Fields
- id
- name
- passwordHash
- registerAt

### Connections
- 1:N Workout
- 1:1 Stat
- 1:N UserExerciseConfig

### Invariants

## Workout
### Fields
- id
- name
- date
- userId
- status
- continuation
- trainingId

### Connections
- N:1 User
- N:1 Training

### Invariants
- finished workout can not be edited

## WorkoutExerciseResult
### Fields
- id
- workoutId
- userExerciseConfigId
- order
### Connections
- N:1 Workout
- 1:N WorkoutSetResult

## WorkoutSetResult
### Fields
- id
- workoutExerciseResultId
- setNumber
- reps
- weight
- time
- isCompleted
## Connections
- N:1 WorkoutExerciseResult

## Training
### Fields
- id
- name
- userId

### Connections
- 1:N TrainingExercise
- N:1 User

### Invariants

## TrainingExercise
### Fields
- id
- trainingId
- userExerciseConfigId
- order
### Connections
- N:1 UserExerciseConfig
- N:1 Training

## UserExerciseConfig
### Fields
- id
- userId
- exerciseId
- plannedSets
- plannedReps
- plannedWeight
- plannedTime
- isArchived

### Connections
- N:1 User
- N:1 Exercise

### Invariants
- can not be removed, archived only
- fields depends on exercise.type

## Exercise
### Fields
- id
- name
- description
- type (weight, time, base)
- link
- isArchived

### Connections
- 1:N UserExerciseConfig

### Invariants
- can not be removed, archived only

## Stats (derived/cache)
### Fields
- reps
- sets
- weight
- workouts
- exercises
- continuation
- calculatedAt

### Connections
- 1:1 User

### Invariants
