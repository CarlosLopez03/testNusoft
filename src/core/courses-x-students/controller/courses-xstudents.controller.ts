import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import { ICourseXStudent } from '../interface/ICxs.interface';
import { CoursesXstudentsService } from '../service/courses-xstudents.service';

@ApiTags('CursosXEstudiantes')
@Controller('courses-xstudents')
export class CoursesXstudentsController {
  constructor(
    private readonly coursesXstudentsService: CoursesXstudentsService,
  ) {}

  @Get('test_get_courses_x_student')
  async getCoursesXStudent(
    @Query('idStudent') idStudent: string,
  ): Promise<RequestResponse> {
    return await this.coursesXstudentsService.getCoursesXStudent(idStudent);
  }

  @Post('test_link_course')
  async linkCourse(@Body() cxs: ICourseXStudent) {
    return this.coursesXstudentsService.linkCourse(cxs);
  }

  @Delete('test_unlink_course')
  async unlikeCourse(@Body() body: []) {
    return this.coursesXstudentsService.unlikeCourse(body);
  }
}
