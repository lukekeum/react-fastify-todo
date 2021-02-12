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

    console.log(body);

    if (!body.email || !body.password) {
      return res.status(400).send({
        message: 'Unknown Input',
        toastify: '올바르지 않은 입력값입니다',
      });
    }

    if (!isEmail(body.email)) {
      return res.status(400).send({
        messae: 'Invalid Email',
        toastify: '올바르지 않은 이메일 형식입니다',
      });
    }

    try {
      const emailUser = await UserModel.findOne({ email: body.email });

      if (!emailUser) {
        return res.status(401).send({
          message: 'Email user not found',
          toastify: '해당 유저는 존재하지 않습니다',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        emailUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).send({
          message: 'Password Incorrect',
          toastify: '비밀번호가 틀렸습니다',
        });
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
