import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageToastrService } from 'src/app/core/services/toasts.service';
import { ILvID } from '../../../interface/ILvID.interface';
import { IStudent } from '../../../interface/IStudent.interface';
import { StudentService } from '../../../service/student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-cursos',
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.scss'],
})
export class CrearCursosComponent implements OnInit, OnDestroy {
  formCourse!: FormGroup;
  listGroup: ILvID[] = [];

  subsGetCourse!: Subscription;
  subsCreateCourse!: Subscription;

  constructor(
    private studentService: StudentService,
    private messageToastrService: MessageToastrService,
    @Inject(MAT_DIALOG_DATA) public data: IStudent,
    public dialogRef: MatDialogRef<CrearCursosComponent>,
    private formBuild: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnDestroy(): void {
    if (this.subsGetCourse) this.subsGetCourse.unsubscribe();
    if (this.subsCreateCourse) this.subsCreateCourse.unsubscribe();
  }

  ngOnInit(): void {
    this.obtainListCourse();
  }

  buildForm() {
    this.formCourse = this.formBuild.group({
      course: ['', Validators.required],
    });
  }

  createCourse() {
    this.subsCreateCourse = this.studentService
      .postExternal('courses-xstudents/test_link_course', {
        course: this.formCourse.controls['course'].value,
        student: this.data.student,
      })
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToastrService.openSnackBar(`${res.message}`);
            return;
          }

          this.dialogRef.close(true);
          this.messageToastrService.openSnackBar(
            'Curso asignado correctamente'
          );
        },
        error: (err) => {
          this.messageToastrService.openSnackBar(`Error: ${err.message}`);
        },
      });
  }

  obtainListCourse() {
    this.subsGetCourse = this.studentService
      .getAllExternal('courses/test_get_courses')
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToastrService.openSnackBar(`Error: ${res.desc}`);
            return;
          }

          this.listGroup = res.data;
        },
        error: (err) => {
          this.messageToastrService.openSnackBar(`Error: ${err.message}`);
        },
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
