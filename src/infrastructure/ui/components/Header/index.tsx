// infrastructure/ui/components/Header

import { useContext, useEffect, useState } from 'react'
import { AppName } from '../../utils/constants'
import ToggleTheme from '../ToggleTheme'
import Themes from '../../utils/themes';
import ThemeContext from '../ThemeContext';

type PropsHeader = {
  className?: string
  onInstructions: () => void
  onStatistics: () => void
}

export default function Header({ onInstructions, onStatistics, className = '' }: PropsHeader) {
  const [theme, setTheme] = useState<string>(Themes.light);
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    toggleTheme(theme);
  }, [theme])

  return (
    <nav
      className={`w-[638px] h-[84px] rounded-[15px] flex items-center justify-between px-2 text-gray-700 bg-zinc-100 dark:bg-gray-300 dark:bg-opacity-5 ${className}`}
      aria-label="Header"
    >
      <div className="flex items-start w-[114px]">
        <img className="w-[27px] h-[27px]" src={`/images/bi_question-circle-fill-${theme}.svg`} role='button' onClick={onInstructions} />
      </div>

      <div className="text-center text-gray-800 dark:text-gray-300 text-[40px] font-semibold font-['Roboto'] tracking-[3px]">
        {AppName}
      </div>

      <div className="flex items-center">
        <img className="w-[36px] h-[32px]" src={`/images/chart_fill-${theme}.svg`} role='button' onClick={onStatistics} />

        <ToggleTheme onChange={setTheme} />
      </div>
    </nav >
  )
}
