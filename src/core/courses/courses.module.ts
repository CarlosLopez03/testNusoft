import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CoursesService } from './service/courses.service';
import { CoursesController } from './controller/courses.controller';
import { CourseSchema } from './schema/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'test_courses',
        schema: CourseSchema,
        collection: 'test_courses',
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
