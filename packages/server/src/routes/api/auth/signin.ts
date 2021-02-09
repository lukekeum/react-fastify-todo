import { FastifyPluginCallback } from 'fastify';

interface ILoginInput {
  email: string;
  password: string;
}

const signInRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/signin', async (req, res) => {
    const body = <ILoginInput>req.body;

    if (!body.email || !body.password) {
      return res.status(401).send({ message: 'Unknown Input' });
    }

    return res.status(201).send({ message: 'Logined' });
  });

  done();
};

export default signInRoute;
