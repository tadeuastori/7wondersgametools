import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { TranslocoModule } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ILanguage } from 'src/app/core/models/language/language.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Observable, takeUntil } from 'rxjs';
import { ISetting } from 'src/app/core/models/setting/setting.model';
import { ApplicationStateSelectors } from 'src/app/core/states/application.queries';
import { ApplicationStateActions } from 'src/app/core/states/application.actions';

@Component({
  selector: 'app-application',
  imports: [MatIconModule, MatSelectModule, MatCardModule, TranslocoModule, ReactiveFormsModule ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.less'
})
export class ApplicationComponent extends BaseComponent implements OnInit {

  applicationSettings$: Observable<ISetting>;
  settingsForm: FormGroup = new FormGroup({});
  languageList: ILanguage[] = [];

  constructor(private _languageService: LanguageService) {
    super();

      this.applicationSettings$ = this._store.select(
        ApplicationStateSelectors.getApplicationSettings
      );
  }

  ngOnInit(): void {
    this.languageList = this._languageService.getLanguageList();

    this.applicationSettings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings: ISetting) => {
        this.loadSettingForm(settings);
      });
  }

  loadSettingForm(settings: ISetting){
    this.settingsForm = new FormGroup({
      userLanguage: new FormControl({ value: settings.userLanguage ? settings.userLanguage : '', disabled: false }, []),
    });

    this.settingsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.saveSettings(formValues);
      });
  }

  saveSettings(settings: ISetting){
    this._store.dispatch(new ApplicationStateActions.SaveApplicationSettings(settings));
  }

}
