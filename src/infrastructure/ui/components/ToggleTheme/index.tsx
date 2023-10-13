// infrastructure/ui/components/ToggleTheme

import { useCallback, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import Themes from '../../utils/themes'
import ButtonTheme from '../ButtonTheme'

type PropsToggleTheme = {
  onChange: (theme: string) => void
}

export default function ToggleTheme({ onChange }: PropsToggleTheme) {
  const [theme, setTheme] = useLocalStorage('theme', Themes.light)

  const dark = useRef<HTMLDivElement>(null)
  const light = useRef<HTMLDivElement>(null)

  const setThemeApp = useCallback(
    (val: string) => {
      if (val === Themes.dark) {
        document.documentElement.classList.add(Themes.dark)
        document.documentElement.classList.remove(Themes.light)

        dark.current && dark.current.classList.add('hidden')
        light.current && light.current.classList.remove('hidden')
      } else {
        document.documentElement.classList.add(Themes.light)
        document.documentElement.classList.remove(Themes.dark)

        light.current && light.current.classList.add('hidden')
        dark.current && dark.current.classList.remove('hidden')
      }

      setTheme(val)
      onChange(val)
    },
    [dark, light, setTheme, onChange]
  )

  useEffect(() => {
    setThemeApp(theme)
  }, [theme, setThemeApp])

  return (
    <>
      <ButtonTheme type='dark' ref={dark} onChange={() => setThemeApp(Themes.dark)} />
      <ButtonTheme type='light' ref={light} onChange={() => setThemeApp(Themes.light)} />
    </>
  )
}
