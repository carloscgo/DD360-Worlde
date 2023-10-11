// infrastructure/ui/hooks/useLocalStorage.tsx

import { useState } from 'react'
import { Some } from '../../../application'

export const getItemStorage = (
  key: string,
  initialValue?: string | object | number | undefined
) => {
  const value = window.localStorage.getItem(key)

  return value ? JSON.parse(value) : initialValue
}

export const setItemStorage = (
  key: string,
  value: string | object | number
) => {
  let valueStorage = value as string

  if (typeof value === 'object') {
    valueStorage = JSON.stringify(value)
  }

  window.localStorage.setItem(key, valueStorage)
}

const useLocalStorage = (key: string, initialValue: Some) => {
  const [state, setState] = useState(() => getItemStorage(key, initialValue))

  const setValue = (value: string | ((prevState: string) => string)) => {
    const valueToStore = value instanceof Function ? value(state) : value

    setItemStorage(key, JSON.stringify(valueToStore))

    setState(value)
  }

  return [state, setValue]
}

export default useLocalStorage
