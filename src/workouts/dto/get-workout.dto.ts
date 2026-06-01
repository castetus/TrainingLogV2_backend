export const getWorkoutByIdDto = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 1 },
    },
    required: ['id'],
  },
}