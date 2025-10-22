import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { playerSchema } from './schemas/player.schema';
import { settingsSchema } from './schemas/settings.schema';
import { importProvidersFrom } from '@angular/core';
import { matchSchema } from './schemas/match.schema';

export const dbConfig: DBConfig = {
  name: '7WondersGameTools',
  version: 2, // <- Update this if you want to create a new schema
  objectStoresMeta: [settingsSchema, playerSchema, matchSchema],
};

export function provideIndexedDb() {
  return importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig));
}