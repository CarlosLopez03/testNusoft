import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { CoursesXstudentsModule } from './courses-x-students/courses-xstudents.module';

@Module({ imports: [StudentsModule, CoursesModule, CoursesXstudentsModule] })
export class CoreModule {}
