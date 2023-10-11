// application/index.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Some = any

import { useIndexedDB, initDB } from 'react-indexed-db/src'

export { useGetWords } from './useGetWords'
export { useGetShapeById } from './useGetShapeById'
export { useAddWord } from './useAddWord'
export { useEditShape } from './useEditShape'
export { useDeleteShape } from './useDeleteShape'
import { Store } from '../infrastructure/ui/utils/constants'

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
}

export { useIndexDB, initDB }
