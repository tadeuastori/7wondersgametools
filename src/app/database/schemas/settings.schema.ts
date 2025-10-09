import { ObjectStoreMeta } from 'ngx-indexed-db';

export const settingsSchema: ObjectStoreMeta = {
  store: 'settings',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'userLanguage', keypath: 'userLanguage', options: { unique: false } },
  ],
};
