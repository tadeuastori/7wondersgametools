import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './database/database.config';
import { provideStore } from '@ngxs/store';
import { ApplicationState } from './core/states/application.state';
import { HammerModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTransloco } from '@jsverse/transloco';
import { environment } from 'src/environments/environment';
import { TranslocoHttpLoader } from './core/services/transloco/transloco-http.loader';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([NgxIndexedDBModule.forRoot(dbConfig), HammerModule]),
    provideStore([ApplicationState]),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pt-br'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
