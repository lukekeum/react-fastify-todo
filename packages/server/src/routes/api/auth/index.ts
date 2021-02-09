import { FastifyPluginCallback } from 'fastify';

import signInRoute from './signin';
import signUpRoute from './signup';

const authRootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signInRoute, { prefix: '/' });
  fastify.register(signUpRoute, { prefix: '/' });

  done();
};

export default authRootRoute;
