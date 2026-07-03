import fastify from 'fastify';
import 'dotenv/config';
import { workoutRoutes } from './modules/workouts/workout.routes';
import { exercisesRoutes } from './modules/exercices/exercises.routes';
import cors from '@fastify/cors';
import { authRoutes } from './auth/auth.routes';
import cookie from '@fastify/cookie';
import { authenticate } from './middleware/authenticate';
import { trainingsRoutes } from './modules/trainings/trainings.routes';
import { registerErrorHandler } from './hooks/registerErrorHandler';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const server = fastify({
  logger: true,
});

await server.register(cookie);

await server.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
});

await server.register(swagger, {
  openapi: {
    info: {
      title: 'TrainingLog API',
      version: '1.0.0',
    },
  },
});

await server.register(swaggerUi, {
  routePrefix: '/docs',
});

registerErrorHandler(server);

server.register(authRoutes);

server.register(async (privateRoutes) => {
  privateRoutes.addHook('preHandler', authenticate);

  privateRoutes.register(exercisesRoutes);
  privateRoutes.register(trainingsRoutes);
  privateRoutes.register(workoutRoutes);
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});