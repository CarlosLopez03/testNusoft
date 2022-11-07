import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import {
  buildResponseFail,
  buildResponseSucess,
} from 'src/shared/IResponse.interface';
import { IStudent } from '../interface/IStudent.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('test_students')
    private readonly studentModel: Model<IStudent>,
  ) {}

  async getStudents(limit?: number, offset?: number): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const getStudents = await this.studentModel
        .find()
        .skip(limit * offset)
        .limit(limit)
        .sort({ first_name: 1 });

      response = buildResponseSucess({
        data: getStudents,
        totalRecords: await this.studentModel.count().limit(limit),
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

  async findStudent(email: string): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const student = await this.studentModel.findOne(
        { email },
        { _id: 0, email: 1 },
      );

      response = buildResponseSucess({
        data: student,
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

  async createStudent(student: IStudent): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const newStudent = new this.studentModel(student);
      await newStudent.save();

      response = buildResponseSucess({ data: newStudent });
    } catch (error) {
      response = buildResponseFail({
        data: error,
        message: error.message,
        state: false,
      });
    }
    return response;
  }

  async updateStudent(
    idStudent: string,
    student: IStudent,
  ): Promise<RequestResponse> {
    let response: RequestResponse;
    try {
      const updateStudent = await this.studentModel.findByIdAndUpdate(
        idStudent,
        student,
        { new: true },
      );

      response = buildResponseSucess({ data: updateStudent });
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
