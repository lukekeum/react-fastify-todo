import { FastifyPluginCallback } from 'fastify';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

import UserModel from '@src/model/user.model';

interface ILoginInput {
  email: string;
  password: string;
}

const signInRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/signin', async (req, res) => {
    const body = <ILoginInput>req.body;

    if (!body.email || !body.password) {
      return res.status(400).send({ message: 'Unknown Input' });
    }

    if (!isEmail(body.email)) {
      return res.status(400).send({ messae: 'Unknown Email' });
    }

    try {
      const emailUser = await UserModel.findOne({ email: body.email });

      if (!emailUser) {
        return res.status(401).send({ message: 'Email user not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        emailUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).send({ message: 'Password Incorrect' });
      }

      // Store user info to session
      req.session.uid = emailUser._id;
      req.session.isLoggedIn = true;

      return res
        .status(201)
        .send({ message: 'Logged In', data: { email: body.email } });
    } catch (err) {
      res.status(500).send({ message: 'Internal Server Error' });
      fastify.log.error(err);
    }
  });

  done();
};

export default signInRoute;
