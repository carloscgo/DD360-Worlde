import { ReactNode, memo, useState } from 'react';
import ThemeContext from '../ThemeContext';
import { Some } from '../../../../application';

type PropsThemeProvider = {
    children: ReactNode
    [key: string]: Some
}

const ThemeProvider = memo(({ children }: PropsThemeProvider) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
});

export default ThemeProvider;
