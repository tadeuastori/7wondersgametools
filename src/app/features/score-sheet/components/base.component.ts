import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { ApplicationStateSelectors } from '../../../core/states/application.queries';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  _store = inject(Store);
  destroy$ = new Subject<void>();

  applicationStateIsReady: Signal<boolean> = this._store.selectSignal(
    ApplicationStateSelectors.isStateReady
  );

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
