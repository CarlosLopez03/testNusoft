import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import {
  buildResponseFail,
  buildResponseSucess,
} from 'src/shared/IResponse.interface';
import { ICourseXStudent } from '../interface/ICxs.interface';

@Injectable()
export class CoursesXstudentsService {
  constructor(
    @InjectModel('test_courses_x_student')
    private readonly cxsModel: Model<ICourseXStudent>,
  ) {}

  async getCoursesXStudent(idStudent: string): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const getCoursesXStudent = await this.cxsModel
        .find({ 'student._id': idStudent }, {})
        .sort({ 'student.first_name': 1 });

      response = buildResponseSucess({
        data: getCoursesXStudent,
        totalRecords: await this.cxsModel.count(),
      });
    } catch (error) {
      response = buildResponseFail({
        data: error,
        message: error.message,
        state: false,
      });
    }
    return response;
  }

  async linkCourse(cxs: ICourseXStudent): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const findDuplicate = await this.cxsModel.find(
        { 'student._id': cxs.student._id, 'course._id': cxs.course._id },
        {},
      );

      if (findDuplicate.length > 0) {
        return (response = buildResponseFail({
          message: 'El estudiante ya cuenta con este curso asignado',
        }));
      }

      delete cxs.course.c_id;
      delete cxs.student.last_name;
      delete cxs.student.lv_id;
      delete cxs.student.phone_number;
      delete cxs.student.group;
      delete cxs.student.email;
      delete cxs.student.geolocation;
      delete cxs.student.status;

      const newLinkCourse = new this.cxsModel(cxs);
      await newLinkCourse.save();

      response = buildResponseSucess({ data: newLinkCourse });
    } catch (error) {
      response = buildResponseFail({
        data: error,
        message: error.message,
        state: false,
      });
    }
    return response;
  }

  async unlikeCourse(idsCourse: []): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const dataByDelete = await this.cxsModel.deleteMany({ _id: idsCourse });
      response = buildResponseSucess({
        data: dataByDelete,
        message: 'Eliminados con exito',
      });
    } catch (error) {
      response = buildResponseFail({
        data: error,
        message: error.message,
        state: false,
      });
    }
    return response;
  }
}
