export const createTrainingDto = {
  body: {
    type: 'object',
    required: ['name', 'exercises'],
    properties: {
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
            'order',
          ],

          properties: {
            exerciseId: {
              type: 'string',
            },
            order: {
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