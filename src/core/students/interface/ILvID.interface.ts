import { Document } from 'mongoose';

export interface ILvID extends Document {
  id?: number;
  name?: string;
}
