export const filterExerciseDto = {
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string', minLength: 3 },
      limit: { type: 'integer', minimum: 1, maximum: 50, default: 20 },
    },
    required: ['search'],
  },
}