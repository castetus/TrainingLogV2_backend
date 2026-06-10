export const loginDto = {
  body: {
    type: 'object',
    required: ['login', 'password'],
    properties: {
      login: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};