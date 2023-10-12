// application/useEditWord.ts

import { useIndexDB } from '.'

export const useEditWord = () => {
  const { updateRecord } = useIndexDB()

  return updateRecord
}
