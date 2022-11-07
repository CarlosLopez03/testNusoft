import { ILvID } from './ILvID.interface';

export interface IStudent {
  _id?: string;
  idStudent?: string;
  first_name?: string;
  last_name?: string;
  fullName?: string;
  lv_id?: ILvID;
  group?: string;
  email?: string;
  phone_number?: string;
  geolocation?: string;
  status?: boolean;
  action?: string;
  student?: IStudent;
}
