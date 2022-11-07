import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CoursesXstudentsService } from './service/courses-xstudents.service';
import { CoursesXstudentsController } from './controller/courses-xstudents.controller';
import { CourseXStudentSchema } from './schema/cxs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'test_courses_x_student',
        schema: CourseXStudentSchema,
        collection: 'test_courses_x_student',
      },
    ]),
  ],
  controllers: [CoursesXstudentsController],
  providers: [CoursesXstudentsService],
})
export class CoursesXstudentsModule {}
