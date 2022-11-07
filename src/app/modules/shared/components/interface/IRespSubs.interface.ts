import { IStudent } from '../../../estudiantes/interface/IStudent.interface';

export interface IRespSubs {
  index?: number;
  isEdit?: boolean;
  student?: IStudent;
}
