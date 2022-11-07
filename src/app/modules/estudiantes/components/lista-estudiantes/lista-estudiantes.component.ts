import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from '../../interface/IStudent.interface';
import { StudentService } from '../../service/student.service';
import { MessageToastrService } from 'src/app/core/services/toasts.service';
import { BaseComponent } from 'src/app/core/base.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEstadoEstudiantesComponent } from '../modal-estado-estudiantes/modal-estado-estudiantes.component';
import { VerCursosComponent } from '../cursos/ver-cursos/ver-cursos.component';
import { CrearCursosComponent } from '../cursos/crear-cursos/crear-cursos.component';
@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.scss'],
})
export class ListaEstudiantesComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  totalRecords!: number;
  dataSource = new MatTableDataSource<IStudent>();
  displayedColumns: string[] = [];

  subsGetStudent!: Subscription;
  susbActionList!: Subscription;

  constructor(
    private studentService: StudentService,
    private messageToastrService: MessageToastrService,
    public dialog: MatDialog
  ) {
    super();
    this.initializeColumns();
  }

  ngOnDestroy(): void {
    if (this.subsGetStudent) this.subsGetStudent.unsubscribe();
    if (this.susbActionList) this.susbActionList.unsubscribe();
  }

  ngOnInit(): void {
    this.getStudent();
    this.catchAction();
  }

  catchAction() {
    this.susbActionList = this.studentService.listStudent.subscribe((resp) => {
      if (!resp) {
        return;
      }

      this.getStudent();
    });
  }

  getStudent() {
    this.subsGetStudent = this.studentService
      .getAllStudent(
        `test_get_students?limit=${BaseComponent.pageSize}&offset=${BaseComponent.pageIndex}`
      )
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToastrService.error('historiaenlinea dice:', res.desc);
            return;
          }

          this.totalRecords = res.totalRecords!;
          this.dataSource.data = res.data;
        },
        error: (err) => {
          this.messageToastrService.error('historiaenlinea dice:', err.message);
        },
      });
  }

  openChangeState(student: IStudent, action: string) {
    this.dialog
      .open(ModalEstadoEstudiantesComponent, {
        data: {
          student,
          status: student.status,
          action,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.getStudent();
      });
  }

  openViewCourse(idStudent: string) {
    this.dialog
      .open(VerCursosComponent, {
        data: {
          idStudent,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.getStudent();
      });
  }

  openCreateCourse(student: IStudent) {
    this.dialog
      .open(CrearCursosComponent, {
        data: {
          fullName: student.first_name! + ' ' + student.last_name!,
          student,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.getStudent();
      });
  }

  onChangeView(isEdit: boolean, student: any = null): void {
    this.studentService.listenChange({ student, isEdit, index: 1 });
  }

  initializeColumns(): void {
    this.displayedColumns = [
      'fullName',
      'grade',
      'group',
      'email',
      'phone',
      'opciones',
    ];
  }
}
