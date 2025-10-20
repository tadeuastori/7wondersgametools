import {
  ApplicationConfig,
  provideZoneChangeDetection, isDevMode,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIndexedDb } from './database/database.config';
import { provideStore } from '@ngxs/store';
import { ApplicationState } from './core/states/application.state';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './core/services/transloco/transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { IconsLoaderService } from './core/loaders/icons-loader.service';

export function initializeIcons(iconLoader: IconsLoaderService): () => void {
  return () => iconLoader.registerIcons();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([ApplicationState]),
    provideIndexedDb(), 
    provideHttpClient(), 
    provideTransloco({
        config: { 
          availableLangs: ['en-ca'],
          defaultLang: 'en-ca',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      provideAppInitializer(() => {
      const iconLoader = inject(IconsLoaderService);
      iconLoader.registerIcons();
    }),
  ],
};
