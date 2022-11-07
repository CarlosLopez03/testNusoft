import { Document } from 'mongoose';
import { ILvID } from './ILvID.interface';

export interface IStudent extends Document {
  _id?: string;
  first_name?: string;
  last_name?: string;
  lv_id?: ILvID;
  group?: string;
  email?: string;
  phone_number?: string;
  geolocation?: string;
  status?: boolean;
}
