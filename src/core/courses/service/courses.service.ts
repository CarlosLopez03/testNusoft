import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import {
  buildResponseFail,
  buildResponseSucess,
} from 'src/shared/IResponse.interface';
import { ICourse } from '../interface/ICourse.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('test_courses')
    private readonly courseModel: Model<ICourse>,
  ) {}

  async getCourses(limit?: number, offset?: number): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const getCourse = await this.courseModel
        .find()
        .skip(limit * offset)
        .limit(limit)
        .sort({ name: -1 });

      response = buildResponseSucess({
        data: getCourse,
        totalRecords: await this.courseModel.count().limit(limit),
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

  async createCourse(course: ICourse): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const newCourse = new this.courseModel(course);
      await newCourse.save();

      response = buildResponseSucess({ data: newCourse });
    } catch (error) {
      response = buildResponseFail({
        data: error,
        message: error.message,
        state: false,
      });
    }
    return response;
  }

  async updateCourse(
    idCourse: string,
    course: ICourse,
  ): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const updateCourse = await this.courseModel.findByIdAndUpdate(
        idCourse,
        course,
        { new: true },
      );

      response = buildResponseSucess({ data: updateCourse });
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
