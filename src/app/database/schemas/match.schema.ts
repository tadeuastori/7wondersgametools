import { ObjectStoreMeta } from 'ngx-indexed-db';

export const matchSchema: ObjectStoreMeta = {
  store: 'match',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'matchDate', keypath: 'matchDate', options: { unique: false } },
    { name: 'game', keypath: 'game', options: { unique: false } },
    { name: 'expansions', keypath: 'expansions', options: { unique: false } },
    { name: 'players', keypath: 'players', options: { unique: false } },
  ],
};
