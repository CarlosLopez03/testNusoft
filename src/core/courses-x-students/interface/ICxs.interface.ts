import { Document } from 'mongoose';
import { ICourse } from 'src/core/courses/interface/ICourse.interface';
import { IStudent } from 'src/core/students/interface/IStudent.interface';

export interface ICourseXStudent extends Document {
  idStudent?: string;
  student: IStudent;
  course: ICourse;
}
