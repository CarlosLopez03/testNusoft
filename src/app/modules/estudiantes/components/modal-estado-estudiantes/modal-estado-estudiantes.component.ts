import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageToastrService } from 'src/app/core/services/toasts.service';
import { IStudent } from '../../interface/IStudent.interface';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-modal-estado-estudiantes',
  templateUrl: './modal-estado-estudiantes.component.html',
  styleUrls: ['./modal-estado-estudiantes.component.scss'],
})
export class ModalEstadoEstudiantesComponent implements OnInit, OnDestroy {
  title: string = '';
  msj: string = '';
  btnName: string = '';

  subsUpdate!: Subscription;

  constructor(
    private studentService: StudentService,
    private messageToast: MessageToastrService,
    @Inject(MAT_DIALOG_DATA) public data: IStudent,
    public dialogRef: MatDialogRef<ModalEstadoEstudiantesComponent>
  ) {}

  ngOnDestroy(): void {
    if (this.subsUpdate) this.subsUpdate.unsubscribe();
  }

  ngOnInit(): void {
    this.setTitle();
  }

  evaluationMethod() {
    switch (this.data.action) {
      case 'desactivar':
        this.stateStudent(false);
        break;

      default:
        this.stateStudent(true);
        break;
    }
  }

  stateStudent(status: boolean) {
    const changeValue: IStudent = {
      status,
    };

    this.subsUpdate = this.studentService
      .updateStudent(this.data.student?._id!, changeValue)
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToast.error(`Error: ${res.message}`);
            return;
          }

          this.messageToast.openSnackBar(
            `${this.data.action}: Estudiante correctamente!`
          );

          this.dialogRef.close(true);
        },
        error: (err) => {
          this.messageToast.error(`Error: ${err.desc}`);
        },
      });
  }

  setTitle() {
    if (!this.data.status) {
      this.title = 'Activar Estudiante';
      this.msj = 'activar';
      this.btnName = 'Activar';

      return;
    }

    this.title = 'Desactivar Estudiante';
    this.msj = 'desactivar';
    this.btnName = 'Desactivar';
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
