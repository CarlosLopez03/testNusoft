import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestResponse } from 'src/shared/IRequestResponse.interface';
import { ICourse } from '../interface/ICourse.interface';
import { CoursesService } from '../service/courses.service';

@ApiTags('Cursos')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('test_get_courses')
  async getCourses(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<RequestResponse> {
    return await this.coursesService.getCourses(limit, offset);
  }

  @Post('createCourse')
  async createCourse(@Body() course: ICourse) {
    return this.coursesService.createCourse(course);
  }

  @Put('updateCourse/:idCourse')
  async updateCourse(
    @Param('idCourse') idCourse: string,
    @Body() course: ICourse,
  ) {
    return this.coursesService.updateCourse(idCourse, course);
  }
}
