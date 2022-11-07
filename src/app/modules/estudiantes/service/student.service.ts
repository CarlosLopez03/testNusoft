import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBaseResp } from '../../shared/IBaseResp.interface';
import { BaseService } from '../../shared/service/base.service';

import { IStudent } from '../interface/IStudent.interface';

export interface IStudentResp extends IBaseResp {
  data: IStudent[];
}

@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseService {
  private entity = 'students/';

  constructor() {
    super();
  }

  private data = new BehaviorSubject<any>({ index: 0 });
  data$ = this.data.asObservable();

  private lists = new BehaviorSubject<any>({});
  lists$ = this.lists.asObservable();

  listStudent = new BehaviorSubject<boolean>(false);

  getAllStudent(method: string): Observable<IStudentResp> {
    return this.get(this.entity + method);
  }

  getAllExternal(methodExternal: string) {
    return this.get(methodExternal);
  }

  findStudent(email: string) {
    return this.get(this.entity + 'findStudent', email);
  }

  createStudent(body: IStudent, params?: Object, options?: Object) {
    return this.post(this.entity + 'createStudent', params, body, options);
  }

  postExternal(
    method: string,
    body: Object,
    params?: Object,
    options?: Object
  ): Observable<any> {
    return this.post(method, params, body, options);
  }

  updateStudent(idStudent: string, body: IStudent, options?: Object) {
    return this.put(
      this.entity + 'test_update_student',
      idStudent,
      body,
      options
    );
  }

  deleteMany(method: string, ids: string[]) {
    return this.deleteWhitBody(method, { body: ids });
  }

  listenChange(obj: Object) {
    this.data.next(obj);
  }

  listenListChange(obj: Object) {
    this.lists.next(obj);
  }
}
