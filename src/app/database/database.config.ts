import { DBConfig } from 'ngx-indexed-db';
import { playerSchema } from './schemas/player.schema';
import { matchSchema } from './schemas/match.schema';

export const dbConfig: DBConfig = {
  name: '7WondersGameTools',
  version: 1,
  objectStoresMeta: [playerSchema],
};
