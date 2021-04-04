import app from '@src/app';
import { Document, model, Schema } from 'mongoose';
import authTokenModel from './authToken.model';
import { ITodo } from './todo.model';

interface IGenerateToken {
  accessToken: string;
  refreshToken: string;
}
export interface IUser extends Document {
  email: string;
  password: string;
  todos: Array<ITodo['_id']>;
  generateToken: () => Promise<IGenerateToken>;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId }],
});

userSchema.methods.generateToken = async function () {
  const authToken = new authTokenModel();
  authToken.fk_user_id = this._id;
  await authToken.save();

  const accessToken = app.server.jwt.sign(
    {
      user_id: this._id,
    },
    {
      subject: 'access-token',
      expiresIn: '1h',
    }
  );

  const refreshToken = app.server.jwt.sign(
    {
      user_id: this._id,
      token_id: authToken._id,
    },
    {
      subject: 'refresh-token',
      expiresIn: '30d',
    }
  );

  return { accessToken, refreshToken } as const;
};

export default model<IUser>('users', userSchema);
