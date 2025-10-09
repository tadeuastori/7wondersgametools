import { DBConfig } from 'ngx-indexed-db';
import { playerSchema } from './schemas/player.schema';
import { settingsSchema } from './schemas/settings.schema';

export const dbConfig: DBConfig = {
  name: '7WondersGameTools',
  version: 1,
  objectStoresMeta: [settingsSchema, playerSchema],
};
