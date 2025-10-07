import { Directive, inject, OnDestroy, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { ApplicationStateSelectors } from '../../../core/states/application.queries';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  _store = inject(Store);
  destroy$ = new Subject<void>();
  protected _snackbarService = inject(SnackbarService);

  applicationStateIsReady: Signal<boolean> = this._store.selectSignal(
    ApplicationStateSelectors.isStateReady
  );

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
