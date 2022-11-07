import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop()
  c_id: number;

  @Prop()
  name: string;

  @Prop()
  credits: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
