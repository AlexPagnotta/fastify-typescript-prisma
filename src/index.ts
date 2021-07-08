import { FastifyInstance } from 'fastify';
import AutoLoad from 'fastify-autoload';
import Sensible from 'fastify-sensible';
import path from 'path';
export default async function app(fastify: FastifyInstance): Promise<void> {

  // Register Sensible for error helpers
  fastify.register(Sensible);

  // AutoLoads routes and plugin from the "routes" and "plugins" folders
  
  fastify.register(AutoLoad, { dir: path.join(__dirname, 'routes') });

  fastify.register(AutoLoad, { dir: path.join(__dirname, 'plugins') });
}
