import { DBConfig } from 'ngx-indexed-db';
import { playerSchema } from './schemas/player.schema';

export const dbConfig: DBConfig = {
  name: '7WondersGameTools',
  version: 1,
  objectStoresMeta: [playerSchema],
};
