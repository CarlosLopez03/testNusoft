import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { StudentsService } from './service/students.service';
import { StudentsController } from './controller/students.controller';
import { StudentSchema } from './schema/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'test_students',
        schema: StudentSchema,
        collection: 'test_students',
      },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
