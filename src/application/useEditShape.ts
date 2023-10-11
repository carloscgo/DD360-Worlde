// application/useEditShape.ts

import { useIndexDB } from '.'

export const useEditShape = () => {
  const { updateRecord } = useIndexDB()

  return updateRecord
}
