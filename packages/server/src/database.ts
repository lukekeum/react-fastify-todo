import { connect, disconnect, ConnectOptions } from 'mongoose';
import app from './app';

export default class Database {
  public async connect(options: ConnectOptions): Promise<any> {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MongoURI not found in env file');

    try {
      await connect(MONGO_URI, options);
      app.server.log.info('Database Connected');
    } catch (err) {
      app.server.log.error(err);
    }
  }

  public disconnect() {
    return disconnect();
  }
}
