export const createWorkoutDto = {
  body: {
    type: 'object',
    required: ['trainingId'],
    properties: {
      trainingId: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};