import { ILvID } from 'src/app/modules/estudiantes/interface/ILvID.interface';
import { IStudent } from 'src/app/modules/estudiantes/interface/IStudent.interface';

export interface ICourseXStudent {
  _id?: string;
  idStudent?: string;
  student?: IStudent;
  course?: ILvID;
}
