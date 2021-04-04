import { Document, model, Schema } from 'mongoose';
import { IUser } from './user.model';
import uuid from 'node-uuid';

export interface IAuthToken extends Document {
  disabled: boolean;
  fk_user_id: IUser['_id'];
}

const tokenSchema = new Schema({
  _id: {
    type: String,
    default: function getUUID() {
      return uuid.v1();
    },
  },
  disabled: { type: Boolean, default: false },
  fk_user_id: { type: Schema.Types.ObjectId, ref: 'users' },
});

export default model<IAuthToken>('tokens', tokenSchema);
