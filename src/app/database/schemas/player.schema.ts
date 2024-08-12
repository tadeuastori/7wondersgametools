import { ObjectStoreMeta } from 'ngx-indexed-db';

export const playerSchema: ObjectStoreMeta = {
  store: 'player',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [{ name: 'name', keypath: 'name', options: { unique: false } }],
};
