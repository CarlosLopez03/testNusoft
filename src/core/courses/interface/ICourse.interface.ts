import { Document } from 'mongoose';

export interface ICourse extends Document {
  _id?: string;
  c_id?: number;
  name?: string;
  credits?: number;
}
