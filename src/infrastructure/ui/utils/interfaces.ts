import { ReactNode } from 'react'
import { Some } from '../../../application'
import { KeyB } from '../../../domain/models/KeyB'

export type PropsButton = {
  onAction: () => void
  [key: string]: Some
}

export type PropsModal = {
  title: string
  children: ReactNode
  labelButton: string
  show: boolean
  onClose: (show: boolean) => void
}

export type PropsHeader = {
  theme: 'dark' | 'light'
}

export type PropsTableWords = {
  words: string[]
}

export type PropsKeyboard = {
  keys: KeyB[]
}
