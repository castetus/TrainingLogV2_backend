## 1. Workout start

### Preconditions
- User is logged in
- Training exists
- Training has at least one TrainingExercise
- User has no active workout

### Flow
1. System creates Workout:
   - userId
   - trainingId
   - status = in_progress
   - startedAt = now

2. System creates WorkoutExerciseResult for each TrainingExercise.

3. System creates empty WorkoutSetResult based on UserExerciseConfig.

4. User starts filling results.

## 2. Workout continue

### Preconditions
- User is logged in
- Workout exists
- Workout status is paused

### Flow
1. System loads existing Workout.
2. System loads WorkoutExerciseResult for this workout.
3. System switches Workout status to in_progress.

### Invariants
- Continue does not recreate workout structure.
- Continue does not depend on current Training state.

## 3. Workout finish

### Preconditions
- Workout exists
- Workout status is in_progress
- Workout has at least one completed set

### Flow
1. System validates workout results.
2. System recalculates user statistics.
3. System switches Workout status to finished.
4. System sets finishedAt = now.

### Invariants
- Finished workout cannot be edited.

## 4. Workout cancel

### Preconditions
- Workout exists
- Workout status is in_progress or paused

### Flow
1. System switches Workout status to cancelled.
2. System sets cancelledAt = now.

### Invariants
- Cancelled workout cannot be continued.
- Cancelled workout is not included in statistics.

## 5. Results editing

### Rules
- Results can be edited only while workout status is in_progress.
- Results cannot be edited when workout status is finished.
- Results cannot be edited when workout status is cancelled.

## 6. Training editing

### Flow
1. User edits Training.
2. User adds/removes/reorders TrainingExercise.
3. System saves new Training structure.

### Invariants
- Editing Training does not affect existing workouts.
- Existing workouts keep their original exercise structure.