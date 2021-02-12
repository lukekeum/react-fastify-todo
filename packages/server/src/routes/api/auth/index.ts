import { FastifyPluginCallback } from 'fastify';
import meRoute from './me';

import signInRoute from './signin';
import signUpRoute from './signup';

const authRootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signInRoute, { prefix: '/' });
  fastify.register(signUpRoute, { prefix: '/' });
  fastify.register(meRoute, { prefix: '/' });

  done();
};

export default authRootRoute;
