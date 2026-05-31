import fastify from 'fastify';
import { workoutRoutes } from './workouts/workout.routes';

const server = fastify();
server.register(workoutRoutes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});