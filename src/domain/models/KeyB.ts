// domain/models/KeyB.ts

import { ReactNode } from 'react'
import { Some } from '../../application'

export type IdKey = string | number
export type BgColor = 'Red' | 'Yellow' | 'Gray' | 'Opaque'
export type TextColor = 'White' | 'Black'
export type Size = 'Lg' | 'Sm'

export type KeyB = {
  index: IdKey
  bgColor: BgColor
  textColor: TextColor
  size: Size
  content: string | ReactNode
  [key: string]: Some
}
