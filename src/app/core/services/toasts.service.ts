import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageToastrService {
  constructor(
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  success(title = 'historiaenlinea dice:', detail?: string, options?: {}) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail,
      life: 4000,
      ...options,
    });
  }

  error(title = 'historiaenlinea dice:', detail?: string, options?: {}) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail,
      life: 4000,
      ...options,
    });
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}
