import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { ApplicationStateSelectors } from '../../../core/states/application.queries';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  _store = inject(Store);
  destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);

  applicationStateIsReady: Signal<boolean> = this._store.selectSignal(
    ApplicationStateSelectors.isStateReady
  );

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openSnackBar(message: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    this._snackBar.open(message, 'Close', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 5 * 1000,
    });
  }
}
