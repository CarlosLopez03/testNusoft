import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ILvID } from '../interface/ILvID.interface';

@Schema()
export class Student extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ type: Object })
  lv_id: ILvID;

  @Prop()
  group: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  geolocation: string;

  @Prop()
  status: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
