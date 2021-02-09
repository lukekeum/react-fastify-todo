import { Document, model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface ITodo extends Document {
  content: string;
  is_finished: boolean;
  owner: IUser['_id'];
}

const todoSchema = new Schema<ITodo>({
  content: { type: String, required: true },
  is_finished: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, required: true },
});

export default model<ITodo>('todos', todoSchema);
