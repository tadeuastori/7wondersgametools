import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationStateSelectors } from './core/states/application.queries';
import { HeadComponent } from './shared/components/head/head.component';
import { ApplicationStateActions } from './core/states/application.actions';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from './shared/components/base.component';
import { ISetting } from './core/models/setting/setting.model';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeadComponent, TranslocoModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent extends BaseComponent implements OnInit {


  currentLanguage: any = '';

  applicationSettings$: Observable<ISetting> = this._store.select(
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

    this.applicationSettings$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (settings) => {
        this._translocoService.setActiveLang(settings.userLanguage);
      },
    });

  }
}