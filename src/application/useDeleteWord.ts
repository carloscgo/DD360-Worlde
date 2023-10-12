// application/useDeleteWord.ts

import { useIndexDB } from '.'

export const useDeleteWord = () => {
  const { deleteRecord } = useIndexDB()

  return deleteRecord
}
