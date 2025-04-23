import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApplicationStateSelectors } from './core/states/application.queries';
import { IApplicationSettings } from './core/models/state/application-state-settings.model';
import { HeadComponent } from './shared/components/head/head.component';
import { ApplicationStateActions } from './core/states/application.actions';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeadComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, OnDestroy {
  private _store = inject(Store);

  applicationSettings: Signal<IApplicationSettings> = this._store.selectSignal(
    ApplicationStateSelectors.getApplicationSettings
  );

  applicationStateIsReady: Signal<boolean> = this._store.selectSignal(
    ApplicationStateSelectors.isStateReady
  );

  constructor() {}
  ngOnInit(): void {
    this._store.dispatch(
      new ApplicationStateActions.InitializeApplicationState()
    );
  }
  ngOnDestroy(): void {}
}
