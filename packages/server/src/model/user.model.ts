import { Document, model, Schema } from 'mongoose';
import { ITodo } from './todo.model';

export interface IUser extends Document {
  email: string;
  password: string;
  todos: Array<ITodo['_id']>;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId }],
});

export default model<IUser>('users', userSchema);
