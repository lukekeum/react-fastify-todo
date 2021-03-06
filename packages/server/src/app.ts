import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';

import { IncomingMessage, Server, ServerResponse } from 'http';

import rootRoute from './routes/api';
import fastifyJWT from 'fastify-jwt';

class App {
  public server: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    const { JWT_SECRET = '' } = process.env;

    this.server = fastify({ logger: true });

    this.server.register(rootRoute, { prefix: '/api' });
    this.server.register(fastifyCompress);
    this.server.register(fastifyCors, { origin: true, credentials: true });

    this.server.register(fastifyCookie);
    this.server.register(fastifyJWT, { secret: JWT_SECRET });
  }

  public async start() {
    const { PORT = String(5000) } = process.env;

    try {
      await this.server.listen(PORT, '0.0.0.0');
    } catch (err) {
      this.server.log.error(err);
    }
  }
}

const app = new App();

export default app;
