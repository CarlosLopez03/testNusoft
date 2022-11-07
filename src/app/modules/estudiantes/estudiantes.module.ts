import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './estudiantes.component';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ListaEstudiantesComponent } from './components/lista-estudiantes/lista-estudiantes.component';
import { CrearEstudiantesComponent } from './components/crear-estudiantes/crear-estudiantes.component';
import { SharedModule } from '../shared/shared.module';
import { ModalEstadoEstudiantesComponent } from './components/modal-estado-estudiantes/modal-estado-estudiantes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerCursosComponent } from './components/cursos/ver-cursos/ver-cursos.component';
import { CrearCursosComponent } from './components/cursos/crear-cursos/crear-cursos.component';

@NgModule({
  declarations: [
    EstudiantesComponent,
    ListaEstudiantesComponent,
    CrearEstudiantesComponent,
    ModalEstadoEstudiantesComponent,
    VerCursosComponent,
    CrearCursosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstudiantesRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [EstudiantesComponent],
})
export class EstudiantesModule {}
