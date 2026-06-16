export const createTrainingDto = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
      },
      type: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};