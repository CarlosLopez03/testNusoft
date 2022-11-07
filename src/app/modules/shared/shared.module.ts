import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginatorComponent } from './components/custom-paginator/custom-paginator.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [CustomPaginatorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CustomPaginatorComponent],
})
export class SharedModule {}
