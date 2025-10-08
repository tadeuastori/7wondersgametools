import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { dbConfig } from './database/database.config';
import { provideStore } from '@ngxs/store';
import { ApplicationState } from './core/states/application.state';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([ApplicationState]),
    provideIndexedDb(dbConfig)
  ],
};
