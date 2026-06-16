export const GetExercisesDTO = {
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string' },
    },
    additionalProperties: false,
  },
};