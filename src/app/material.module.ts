import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

const myModule = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatListModule,
];

@NgModule({
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class MaterialModule {}
