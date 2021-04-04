import { FastifyPluginCallback } from 'fastify';
// import authRootRoute from './auth';

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  // fastify.register(authRootRoute, { prefix: '/auth' });

  done();
};

export default rootRoute;
