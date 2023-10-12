import { createContext } from 'react';

type ThemeContextValue = {
    theme: string;
    toggleTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => { },
});

export default ThemeContext;
