import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  baseDuration: number = 5;

  constructor(private _snackBar: MatSnackBar) { }

  private openSnackBar(message: string, css: string, durationInSec: number) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    this._snackBar.open(message, 'Close', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: durationInSec * 1000,
      panelClass: [css]
    });
  }

  public openSuccessSnackBar(message: string){ 
    this.openSnackBar(message, 'snackbar-success', this.baseDuration);
   }

  public openDangerSnackBar(message: string){ 
    this.openSnackBar(message, 'snackbar-danger', this.baseDuration);
   }

  public openInfoSnackBar(message: string){ 
    this.openSnackBar(message, 'snackbar-info', this.baseDuration);
   }

  public openWarningSnackBar(message: string){ 
    this.openSnackBar(message, 'snackbar-warning', this.baseDuration);
   }

  public openPrimarySnackBar(message: string){ 
    this.openSnackBar(message, 'snackbar-primary', this.baseDuration);
   }
}
