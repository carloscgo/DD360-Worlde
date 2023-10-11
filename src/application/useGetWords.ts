// application/useGetWords.ts

import { useIndexDB } from '.'

export const useGetWords = () => {
  const { getAll } = useIndexDB()

  return getAll
}
