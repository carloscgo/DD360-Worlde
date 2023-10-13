import {
    render,
    fireEvent,
} from '../../../../../setupTest'
import ThemeContext from '../ThemeContext';
import ThemeProvider from './';

describe('ThemeProvider', () => {
    it('should toggle the theme when button is clicked', () => {
        const { getByTestId } = render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {value => (
                        <>
                            <div data-test="theme">{value.theme}</div>
                            <button data-test="toggle" onClick={() => value.toggleTheme('dark')}>
                                Toggle
                            </button>
                        </>
                    )}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        const themeElement = getByTestId('theme');
        const toggleButton = getByTestId('toggle');

        expect(themeElement.textContent).toBe('light');

        fireEvent.click(toggleButton);

        expect(themeElement.textContent).toBe('dark');
    });
});
