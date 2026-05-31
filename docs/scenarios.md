## 1. Workout start
### preconditions:
User is logged in
training exists

### flow:
system creates a workout based on Training
system creates TrainingExercises based on UserExerciseConfigs
system creates empty WorkoutExerciseResult based on UserExerciseConfigs
system switch workout to status 'in_progress'

## 2. Workout continue
### preconditions:
user is logged in
workout with status 'paused' exists

### flow:
system search for WorkoutExerciseResult for this workout
system switch workout to status 'in_progress'

if there's no Training for this workout, system switch workout to status 'finished'
if there's no WorkoutExerciseResult for this workout, system creates empty WorkoutExerciseResult based on UserExerciseConfigs

## 3. Workout finish
### preconditions:
workout exists and has status 'in_progress'

### flow:
system renew statistics
system switch workout to status 'finished'

## 4. Workout canceling
### preconditions:
workout exists and has status 'in_progress'

### flow:
system switch workout to status 'cancel'
system remove WorkoutExerciseResult for this workout

## 5. Results editing
restricted

## 6. Template (training) editing
user tell he want to edit training
user add TrainingExercise to training
system renew training
