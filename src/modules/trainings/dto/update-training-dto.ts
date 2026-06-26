export const updateTrainingDto = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'uuid',
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      exercises: {
        type: 'array',

        items: {
          type: 'object',

          required: [
            'exerciseId',
            'position',
          ],

          properties: {
            exerciseId: {
              type: 'string',
            },
            position: {
              type: 'number',
            },
            plannedSets: {
              type: 'number',
            },
            plannedReps: {
              type: 'number',
            },
            plannedWeight: {
              type: 'number',
            },
            plannedTime: {
              type: 'number',
            }
          },
        },
      },
    },
  },
};