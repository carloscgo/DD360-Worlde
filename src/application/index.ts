// application/index.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Some = any;

import { useIndexedDB, initDB } from "react-indexed-db-hook";

import { Store } from '../infrastructure/ui/utils/constants';

const useIndexDB = () => {
  const {
    getByID,
    getAll,
    getByIndex,
    add: addRecord,
    update: updateRecord,
    deleteRecord,
  } = useIndexedDB(Store)

  return {
    getByID,
    getAll,
    getByIndex,
    addRecord,
    updateRecord,
    deleteRecord,
  }
};

const configDB = {
  name: 'DB-DD360',
  version: 1,
  objectStoresMeta: [
    {
      store: Store,
      storeConfig: { keyPath: "index", autoIncrement: true },
      storeSchema: [
        { name: "letters", keypath: "letters", options: { unique: false } },
        { name: "status", keypath: "status", options: { unique: false } },
      ],
    },
    {
      store: 'dictionary',
      storeConfig: { keyPath: "index", autoIncrement: true },
      storeSchema: [
        { name: "word", keypath: "word", options: { unique: true } },
      ],
    },
  ],
};

export const readDictionary = async () => {
  const response = await fetch('/dictionary/words.txt');

  const data = await response.text();

  return data.split('\n').filter(word => word.length === 5).map(word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
};

export { useIndexDB, initDB, configDB };
