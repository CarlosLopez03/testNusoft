import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICourseXStudent } from 'src/app/modules/shared/components/interface/ICxs.interface';
import { StudentService } from '../../../service/student.service';
import { Subscription } from 'rxjs';
import { MessageToastrService } from 'src/app/core/services/toasts.service';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.scss'],
})
export class VerCursosComponent implements OnInit, OnDestroy {
  listCourses: ICourseXStudent[] = [];
  listId: string[] = [];

  subsGetCourses!: Subscription;
  subsDeleteMany!: Subscription;

  constructor(
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: ICourseXStudent,
    public dialogRef: MatDialogRef<VerCursosComponent>,
    private messageToastrService: MessageToastrService
  ) {}

  ngOnDestroy(): void {
    if (this.subsGetCourses) this.subsGetCourses.unsubscribe();
    if (this.subsDeleteMany) this.subsDeleteMany.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.data.idStudent) {
      return;
    }

    this.getCourses();
  }

  getCourses() {
    this.subsGetCourses = this.studentService
      .getAllExternal(
        `courses-xstudents/test_get_courses_x_student?idStudent=${this.data.idStudent}`
      )
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToastrService.error('historiaenlinea dice:', res.desc);
            return;
          }

          this.listCourses = res.data;
        },
        error: (err) => {
          this.messageToastrService.error('historiaenlinea dice:', err.message);
        },
      });
  }

  addList(coursesSelect: any) {
    coursesSelect.forEach((item: any) => {
      this.listId.push(item._value);
    });
  }

  deleteCourse(coursesSelect: any) {
    this.addList(coursesSelect);

    if (this.listId.length === 0) {
      this.messageToastrService.openSnackBar(
        'No ha seleccionado ningún registro para eliminar'
      );
      return;
    }

    this.methodDeleteCourses(this.listId);
  }

  methodDeleteCourses(coursesSelect: any[]) {
    this.subsDeleteMany = this.studentService
      .deleteMany('courses-xstudents/test_unlink_course', coursesSelect)
      .subscribe({
        next: (res) => {
          if (!res.state) {
            return;
          }

          this.listId = [];
          this.dialogRef.close(true);
          this.messageToastrService.openSnackBar(
            'Curso(s) eliminados exitosamente'
          );
        },
        error: (err) => {
          this.messageToastrService.openSnackBar(`Error: ${err.desc}`);
        },
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
