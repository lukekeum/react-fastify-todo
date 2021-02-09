import { FastifyPluginCallback } from 'fastify';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

import UserModel from './../../../model/user.model';

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

    if (!isEmail(body.email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    try {
      const emailUser = await UserModel.findOne({ email: body.email });

      if (emailUser) {
        return res.status(401).send({ message: 'Email user already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(body.password, salt);

      const user = new UserModel();
      user.email = body.email;
      user.password = hashed_password;

      await user.save();

      req.session.uid = user._id;
      req.session.isLoggedIn = true;

      return res.status(201).send({
        message: 'Registered',
        data: {
          email: body.email,
        },
      });
    } catch (err) {
      res.status(500).send({ message: 'Internal Error' });
      fastify.log.error(err);
    }
  });

  done();
};

export default signUpRoute;
