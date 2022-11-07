import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit, OnDestroy {
  public index!: number;
  public changeName: string = 'Crear Estudiante';

  subsData!: Subscription;

  constructor(private studentService: StudentService) {}

  ngOnDestroy(): void {
    if (this.subsData) this.subsData.unsubscribe();
  }

  ngOnInit(): void {
    this.studentService.data$.subscribe((resp) => {
      this.onChangeView(resp);
    });
  }

  onChangeView(obj: any) {
    this.index = obj.index!;
    !obj.isEdit
      ? (this.changeName = 'Crear Estudiante')
      : (this.changeName = 'Actualizar Estudiante');
  }
}
