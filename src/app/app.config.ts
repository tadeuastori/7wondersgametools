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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([NgxIndexedDBModule.forRoot(dbConfig)]),
    provideStore([ApplicationState]),
  ],
};
