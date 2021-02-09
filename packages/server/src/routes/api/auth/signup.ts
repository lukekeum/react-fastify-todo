import { FastifyPluginCallback } from 'fastify';

interface ISignUpInput {
  email: string;
  password: string;
}

const signUpRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/signup', async (req, res) => {
    const body = <ISignUpInput>req.body;

    if (!body.email || !body.password) {
      return res.status(400).send({ message: 'Unknown input' });
    }

    return res.status(201).send({ message: 'registered' });
  });

  done();
};

export default signUpRoute;
