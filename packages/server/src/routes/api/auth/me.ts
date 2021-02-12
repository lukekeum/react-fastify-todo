import { FastifyPluginCallback } from 'fastify';
import UserModel from '@src/model/user.model';

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/me', async (req, res) => {
    if (!req.session.uid)
      return res.status(401).send({ message: 'sessionID not found' });

    const uid = req.session.uid;

    try {
      const user = await UserModel.findOne({ _id: uid });

      if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }

      return res.status(200).send({ data: { email: user.email } });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  });

  done();
};

export default meRoute;
