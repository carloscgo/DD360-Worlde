// application/useGetShapeById.ts

import { useIndexDB } from '.'

export const useGetShapeById = () => {
  const { getByID } = useIndexDB()

  return getByID
}
