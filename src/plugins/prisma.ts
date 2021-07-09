import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin = async (fastify: FastifyInstance) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  // Disconnect DB connection
  fastify.addHook('onClose', async (fastify) => {
    fastify.log.info('disconnecting Prisma from DB');
    await fastify.prisma.$disconnect();
  });
};

export default fp(prismaPlugin);
