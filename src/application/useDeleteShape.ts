// application/useDeleteShape.ts

import { useIndexDB } from '.'

export const useDeleteShape = () => {
  const { deleteRecord } = useIndexDB()

  return deleteRecord
}
