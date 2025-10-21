import { ObjectStoreMeta } from 'ngx-indexed-db';

export const matchSchema: ObjectStoreMeta = {
  store: 'matchGame',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'matchDate', keypath: 'matchDate', options: { unique: false } },
    { name: 'gameType', keypath: 'gameType', options: { unique: false } },
    { name: 'expansions', keypath: 'expansions', options: { unique: false } },
    { name: 'players', keypath: 'players', options: { unique: false } },
  ],
};
