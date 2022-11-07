import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICourse } from 'src/core/courses/interface/ICourse.interface';
import { IStudent } from 'src/core/students/interface/IStudent.interface';

@Schema()
export class CourseXStudent extends Document {
  @Prop({ type: Object })
  student: IStudent;

  @Prop({ type: Object })
  course: ICourse;
}

export const CourseXStudentSchema =
  SchemaFactory.createForClass(CourseXStudent);
