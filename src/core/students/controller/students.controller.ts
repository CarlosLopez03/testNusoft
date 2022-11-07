import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import { IStudent } from '../interface/IStudent.interface';
import { StudentsService } from '../service/students.service';

@ApiTags('Estudiantes')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('test_get_students')
  async getStudents(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<RequestResponse> {
    return await this.studentsService.getStudents(limit, offset);
  }

  @Get('findStudent/:email')
  async findStudent(@Param('email') email: string) {
    return await this.studentsService.findStudent(email);
  }

  @Post('createStudent')
  async createStudent(@Body() student: IStudent) {
    return this.studentsService.createStudent(student);
  }

  @Put('test_update_student/:idStudent')
  async updateStudent(
    @Param('idStudent') idStudent: string,
    @Body() student: IStudent,
  ) {
    return this.studentsService.updateStudent(idStudent, student);
  }
}
