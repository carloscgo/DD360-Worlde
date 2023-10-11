// application/useAddWord.ts

import { useIndexDB } from '.'

export const useAddWord = () => {
  const { addRecord } = useIndexDB()

  return addRecord
}
