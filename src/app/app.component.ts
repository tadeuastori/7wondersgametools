import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationStateSelectors } from './core/states/application.queries';
import { HeadComponent } from './shared/components/head/head.component';
import { ApplicationStateActions } from './core/states/application.actions';
import { TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from './shared/components/base.component';
import { ISetting } from './core/models/setting/setting.model';
import { Observable, takeUntil } from 'rxjs';
import { LanguageService } from './core/services/language.service';
import { LoadingPageComponent } from "./shared/components/loading-page/loading-page.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeadComponent, LoadingPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent extends BaseComponent implements OnInit {
  currentLanguage: any = '';

  applicationSettings$: Observable<ISetting> = this._store.select(
    ApplicationStateSelectors.getApplicationSettings
  );

  constructor(private _translocoService: TranslocoService,private _languageService: LanguageService) {
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
        // if(settings.userLanguage != 'OS') {
        //   this._translocoService.setActiveLang(settings.userLanguage);
        // } else {
        //       const deviceLanguage: string = navigator.language;
        //       var languageList = this._languageService.getLanguageList();

        //       if (languageList.some((l) => l.code == deviceLanguage.toLowerCase())){
        //           this._translocoService.setActiveLang(deviceLanguage.toLowerCase());
        //       } else {
        //           this._translocoService.setActiveLang('en');
        //       }
        // }

        this._translocoService.setActiveLang('en');

        console.log(this._translocoService.getActiveLang());
      },
    });

  }
}