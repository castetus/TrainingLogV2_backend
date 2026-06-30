export const updateWorkoutDto = {
  body: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['in_progress', 'finished', 'cancelled', 'paused'],
      },
      continuation: {
        type: 'number',
        minimum: 0,
      },
    },
  },
}