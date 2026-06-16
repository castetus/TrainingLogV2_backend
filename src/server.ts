import fastify from 'fastify';
import 'dotenv/config';
import { workoutRoutes } from './workouts/workout.routes';
import { exercisesRoutes } from './modules/exercices/exercises.routes';
import cors from '@fastify/cors';
import { authRoutes } from './auth/auth.routes';
import cookie from '@fastify/cookie';
import { authenticate } from './middleware/authenticate';

const server = fastify();

await server.register(cookie);

await server.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
});

server.register(authRoutes);

server.register(async (privateRoutes) => {
  privateRoutes.addHook('preHandler', authenticate);

  privateRoutes.register(exercisesRoutes);
  privateRoutes.register(workoutRoutes);
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});