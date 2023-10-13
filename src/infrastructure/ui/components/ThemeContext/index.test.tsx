import {
    render,
} from '../../../../../setupTest'
import ThemeProvider from '../ThemeProvider';
import ThemeContext from './';

describe('ThemeContext', () => {
    it('renders with default values', () => {
        const { container } = render(<ThemeProvider>
            <ThemeContext.Consumer>{value => JSON.stringify(value)}</ThemeContext.Consumer>
        </ThemeProvider>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders with custom values', () => {
        const theme = 'dark';
        const toggleTheme = jest.fn();
        const values = { theme, toggleTheme }

        const { getByText } = render(
            <ThemeProvider value={values}>
                <ThemeContext.Consumer>
                    {value => (
                        <>
                            <div>{value.theme}</div>
                            <button onClick={() => value.toggleTheme('light')}>Toggle</button>
                        </>
                    )}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        const themeElement = getByText('light');
        const toggleButton = getByText('Toggle');

        expect(themeElement).toBeInTheDocument();
        expect(toggleButton).toBeInTheDocument();
    });
});
