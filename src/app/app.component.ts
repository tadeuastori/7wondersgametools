import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApplicationStateSelectors } from './core/states/application.queries';
import { IApplicationSettings } from './core/models/state/application-state-settings.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  private _store = inject(Store);

  constructor() {}

  applicationSettings: Signal<IApplicationSettings> = this._store.selectSignal(
    ApplicationStateSelectors.getApplicationSettings
  );
}
