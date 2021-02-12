import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import fastifyCors from 'fastify-cors';
import mongoose from 'mongoose';

import { IncomingMessage, Server, ServerResponse } from 'http';

import rootRoute from './routes/api';

class App {
  public server: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    const { SESSION_SECRET = '' } = process.env;

    this.server = fastify({ logger: true });

    this.server.register(rootRoute, { prefix: '/api' });
    this.server.register(fastifyCompress);
    this.server.register(fastifyCors);

    this.server.register(fastifyCookie);
    this.server.register(fastifySession, {
      cookieName: 'sessionId',
      secret: SESSION_SECRET,
      store: require('mongoose-session')(mongoose),
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 30, // 30min
      },
    });
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
