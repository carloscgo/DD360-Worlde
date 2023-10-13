// application/index.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Some = any;

import { useIndexedDB, initDB } from "react-indexed-db-hook";

import { Store } from '../infrastructure/ui/utils/constants';
import { Words } from "../domain/models/Word";

const useIndexDB = (dbName: string) => {
  const {
    getByID,
    getAll,
    getByIndex,
    add: addRecord,
    update: updateRecord,
    deleteRecord,
  } = useIndexedDB(dbName)

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
  version: 6,
  objectStoresMeta: [
    {
      store: Store.Words,
      storeConfig: { keyPath: "index", autoIncrement: true },
      storeSchema: [
        { name: "word", keypath: "word", options: { unique: true } },
        { name: "letters", keypath: "letters", options: { unique: false } },
        { name: "status", keypath: "status", options: { unique: false } },
      ],
    },
    {
      store: Store.Statistics,
      storeConfig: { keyPath: "index", autoIncrement: false },
      storeSchema: [
        { name: "plays", keypath: "plays", options: { unique: false } },
        { name: "victories", keypath: "victories", options: { unique: false } },
        { name: "timer", keypath: "timer", options: { unique: false } },
      ],
    },
  ],
};

export const readDictionary = async (wordsPlayed: Words) => {
  const wordsList = wordsPlayed.flatMap(({word}) => word);

  const response = await fetch('/dictionary/words.txt');

  const data = (await response.text()) as unknown as string;

  const wordsMapped = [
    ...new Set([
      ...data
        .split('\n')
        .map(word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        .filter(word => word.length === 5 && !wordsList.includes(word))
    ])
  ];

  return wordsMapped[Math.floor(Math.random() * wordsMapped.length)];
};

export { useIndexDB, initDB, configDB };
