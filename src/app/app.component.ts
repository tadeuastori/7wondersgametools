import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationStateSelectors } from './core/states/application.queries';
import { IApplicationSettings } from './core/models/state/application-state-settings.model';
import { HeadComponent } from './shared/components/head/head.component';
import { ApplicationStateActions } from './core/states/application.actions';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from './shared/components/base.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeadComponent, TranslocoModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent extends BaseComponent implements OnInit {


  currentLanguage: any = '';

  applicationSettings: Signal<IApplicationSettings> = this._store.selectSignal(
    ApplicationStateSelectors.getApplicationSettings
  );

  constructor(private _translocoService: TranslocoService) {
    super()
    this._translocoService.langChanges$.pipe(takeUntilDestroyed()).subscribe({
      next: (lang) => {
        this.currentLanguage = lang;
      },
    });
  }
  ngOnInit(): void {
    this._store.dispatch(
      new ApplicationStateActions.InitializeApplicationState()
    );

    this._translocoService.setActiveLang('en');
  }
}