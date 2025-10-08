import {
  ApplicationConfig,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { dbConfig } from './database/database.config';
import { provideStore } from '@ngxs/store';
import { ApplicationState } from './core/states/application.state';
import { provideIndexedDb } from 'ngx-indexed-db';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './core/services/transloco/transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([ApplicationState]),
    provideIndexedDb(dbConfig), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['en'],
          defaultLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ],
};
